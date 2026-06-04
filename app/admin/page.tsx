"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BannerItem {
  _id: string;
  index: number;
  imageUrl: string;
}

export default function AdminDashboardPage() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  // Offer states
  interface OfferItem {
    _id: string;
    tag: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    isActive: boolean;
    createdAt: string;
  }
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [offerTag, setOfferTag] = useState("Limited Time Offer");
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [offerBtnText, setOfferBtnText] = useState("Learn More");
  const [offerBtnLink, setOfferBtnLink] = useState("/contact");
  const [offerIsActive, setOfferIsActive] = useState(false);
  const [offerSaving, setOfferSaving] = useState(false);

  const fetchOffers = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5001/api/offer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchBanners = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/banner");
        if (res.ok) {
          const data = await res.json();
          // Sort items by index
          const sorted = data.sort((a: BannerItem, b: BannerItem) => a.index - b.index);
          setBanners(sorted);

          // Initialize input states
          const initialInputs: Record<number, string> = {};
          sorted.forEach((item: BannerItem) => {
            initialInputs[item.index] = item.imageUrl;
          });
          setInputs(initialInputs);
        } else {
          setMessage({ type: "error", text: "Failed to load banner images." });
        }
      } catch (err) {
        console.error(err);
        setMessage({ type: "error", text: "Unable to connect to the backend server." });
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
    fetchOffers();
  }, [router]);

  const handleInputChange = (index: number, val: string) => {
    setInputs((prev) => ({
      ...prev,
      [index]: val,
    }));
  };

  const handleUpdateBanner = async (index: number) => {
    setMessage(null);
    setSavingIndex(index);

    const token = localStorage.getItem("adminToken");
    const imageUrl = inputs[index];

    if (!imageUrl) {
      setMessage({ type: "error", text: "Image URL/path cannot be empty." });
      setSavingIndex(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/banner/${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `Banner slot ${index + 1} updated successfully!` });
        // Update local state
        setBanners((prev) =>
          prev.map((item) => (item.index === index ? { ...item, imageUrl } : item))
        );
      } else {
        setMessage({ type: "error", text: data.message || "Failed to update banner image." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error occurred while saving." });
    } finally {
      setSavingIndex(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSaving(true);
    const token = localStorage.getItem("adminToken");
    const payload = {
      tag: offerTag,
      title: offerTitle,
      description: offerDescription,
      buttonText: offerBtnText,
      buttonLink: offerBtnLink,
      isActive: offerIsActive,
    };

    try {
      let res;
      if (editingOffer) {
        res = await fetch(`http://localhost:5001/api/offer/${editingOffer._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:5001/api/offer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingOffer ? "Offer updated successfully!" : "Offer created successfully!",
        });
        resetOfferForm();
        fetchOffers();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to save offer." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error saving offer." });
    } finally {
      setOfferSaving(false);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5001/api/offer/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Offer deleted successfully!" });
        fetchOffers();
      } else {
        setMessage({ type: "error", text: "Failed to delete offer." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error deleting offer." });
    }
  };

  const handleToggleActivation = async (id: string, currentlyActive: boolean) => {
    const token = localStorage.getItem("adminToken");
    const endpoint = currentlyActive ? "deactivate" : "activate";
    try {
      const res = await fetch(`http://localhost:5001/api/offer/${id}/${endpoint}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: currentlyActive ? "Offer deactivated successfully!" : "Offer activated successfully!",
        });
        fetchOffers();
      } else {
        setMessage({ type: "error", text: "Failed to update offer status." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error updating offer status." });
    }
  };

  const startEditOffer = (offer: OfferItem) => {
    setEditingOffer(offer);
    setOfferTag(offer.tag);
    setOfferTitle(offer.title);
    setOfferDescription(offer.description);
    setOfferBtnText(offer.buttonText);
    setOfferBtnLink(offer.buttonLink);
    setOfferIsActive(offer.isActive);
    setShowOfferForm(true);
  };

  const resetOfferForm = () => {
    setEditingOffer(null);
    setOfferTag("Limited Time Offer");
    setOfferTitle("");
    setOfferDescription("");
    setOfferBtnText("Learn More");
    setOfferBtnLink("/contact");
    setOfferIsActive(false);
    setShowOfferForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-500 font-semibold text-sm">Loading admin dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-150 h-[70px] px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/images/Child Craft Logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <h1 className="text-sm font-black text-primary tracking-wider uppercase leading-none">
              Admin Dashboard
            </h1>
            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
              Portal Manager
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all"
        >
          Logout
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Manage Banner Images
            </h2>
            <p className="text-sm text-slate-500 max-w-xl font-light mt-1">
              You can modify the image path or URL for each of the 5 slideshow banner slots. You cannot add new slots or delete existing ones.
            </p>
          </div>
        </div>

        {/* Action Status Messages */}
        {message && (
          <div
            className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : "bg-rose-50 border-rose-100 text-rose-700"
            }`}
          >
            {message.type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Banner Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4].map((index) => {
            const banner = banners.find((b) => b.index === index);
            const currentUrl = banner ? banner.imageUrl : "";
            const inputValue = inputs[index] || "";
            const isSaving = savingIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 border border-slate-150 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
                      Slot {index + 1}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Index: {index}</span>
                  </div>

                  {/* Image Preview */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-4">
                    {currentUrl ? (
                      <img
                        src={currentUrl.startsWith("/") ? currentUrl : currentUrl}
                        alt={`Preview Slot ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/bookscover/std1term1.jpeg"; // fallback image
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                        No image path configured
                      </div>
                    )}
                  </div>

                  {/* Edit Field */}
                  <div className="space-y-1 mb-4">
                    <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Image Path or Link
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder="e.g. /images/banner3.png"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-xs text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleUpdateBanner(index)}
                  disabled={isSaving || inputValue === currentUrl}
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-3.5 w-3.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Update Slot"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <hr className="my-12 border-slate-200" />

        {/* Offers Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Manage Home Page Offers
            </h2>
            <p className="text-sm text-slate-500 max-w-xl font-light mt-1">
              Add, edit, or toggle promotional banner announcements shown at the bottom of the home page.
            </p>
          </div>
          <button
            onClick={() => {
              if (showOfferForm) {
                resetOfferForm();
              } else {
                setShowOfferForm(true);
              }
            }}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            {showOfferForm ? "Cancel" : "+ Create New Offer"}
          </button>
        </div>

        {/* Offer Create/Edit Form */}
        {showOfferForm && (
          <form
            onSubmit={handleOfferSubmit}
            className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm mb-8 space-y-6 max-w-3xl"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {editingOffer ? "Edit Promotional Offer" : "Create New Promotional Offer"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600 tracking-wider block">
                  Tag / Label
                </label>
                <input
                  type="text"
                  required
                  value={offerTag}
                  onChange={(e) => setOfferTag(e.target.value)}
                  placeholder="e.g. 2026 Academic Season Offer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600 tracking-wider block">
                  Offer Title
                </label>
                <input
                  type="text"
                  required
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  placeholder="e.g. Partner with Us & Save up to 20%"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-slate-600 tracking-wider block">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={offerDescription}
                onChange={(e) => setOfferDescription(e.target.value)}
                placeholder="Describe the offer details..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600 tracking-wider block">
                  Button Text
                </label>
                <input
                  type="text"
                  required
                  value={offerBtnText}
                  onChange={(e) => setOfferBtnText(e.target.value)}
                  placeholder="e.g. Request Institutional Quote"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-600 tracking-wider block">
                  Button Link
                </label>
                <input
                  type="text"
                  required
                  value={offerBtnLink}
                  onChange={(e) => setOfferBtnLink(e.target.value)}
                  placeholder="e.g. /contact?ref=academic-offer"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="offerIsActive"
                checked={offerIsActive}
                onChange={(e) => setOfferIsActive(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary/20 border-slate-350 rounded"
              />
              <label htmlFor="offerIsActive" className="text-sm font-medium text-slate-700">
                Activate this offer immediately (will deactivate any other active offer)
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={offerSaving}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                {offerSaving ? "Saving..." : editingOffer ? "Update Offer" : "Save Offer"}
              </button>
              <button
                type="button"
                onClick={resetOfferForm}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Offers List */}
        <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden">
          {offers.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No promotional offers created yet. Click "+ Create New Offer" above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    <th className="px-6 py-4">Tag / Label</th>
                    <th className="px-6 py-4">Title & Details</th>
                    <th className="px-6 py-4">CTA Button</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                  {offers.map((offerItem) => (
                    <tr key={offerItem._id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                          {offerItem.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-sm">
                        <div className="font-bold text-slate-900">{offerItem.title}</div>
                        <div className="text-xs text-slate-400 truncate mt-0.5">{offerItem.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-xs bg-slate-50 border border-slate-150 inline-block px-2 py-1 rounded-md">
                          {offerItem.buttonText} &rarr; <span className="font-mono text-slate-400 text-[10px]">{offerItem.buttonLink}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleActivation(offerItem._id, offerItem.isActive)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                            offerItem.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/50"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${offerItem.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
                          {offerItem.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-2">
                        <button
                          onClick={() => startEditOffer(offerItem)}
                          className="px-3 py-1.5 text-primary hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOffer(offerItem._id)}
                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-100 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
