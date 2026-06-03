"use client";

import React, { useState } from "react";
import { FaPenNib, FaPaintBrush, FaChalkboardTeacher, FaRegEnvelope, FaUser, FaPhone, FaLink } from "react-icons/fa";

interface Position {
    title: string;
    department: string;
    type: string;
    description: string;
    requirements: string[];
    icon: React.ReactNode;
}

const openPositions: Position[] = [
    {
        title: "Educational Content Developer",
        department: "Editorial & Content Development",
        type: "Full-Time / Hybrid",
        icon: <FaPenNib className="w-6 h-6 text-blue-600" />,
        description: "Review and curate engaging educational content for school textbook series across CBSE, ICSE, and State boards.",
        requirements: [
            "Post-graduate/graduate degree in Education, English, Mathematics, or Science.",
            "Strong command over written English and child pedagogy.",
            "Prior experience in textbook drafting or lesson planning is a plus."
        ]
    },
    {
        title: "Graphic Designer & Children's Book Illustrator",
        department: "Creative & Book Design",
        type: "Full-Time (In-office)",
        icon: <FaPaintBrush className="w-6 h-6 text-rose-600" />,
        description: "Design vibrant textbook cover pages, clean multi-column text layouts, and custom illustrations geared toward young learners.",
        requirements: [
            "Proficiency in Adobe InDesign, Photoshop, and Illustrator.",
            "A creative portfolio showcasing illustration skills and children's book layouts.",
            "Excellent understanding of color psychology and print media standards."
        ]
    },
    {
        title: "Academic Coordinator & Teacher Trainer",
        department: "Academic Support Services",
        type: "Full-Time (Requires Travel)",
        icon: <FaChalkboardTeacher className="w-6 h-6 text-emerald-600" />,
        description: "Conduct training seminars for partner schools, coordinate implementation of our digital/printed content, and collect feedback.",
        requirements: [
            "Degree in education or relevant academic field with 2+ years teaching experience.",
            "Exceptional public speaking, presentation, and training skills.",
            "Willingness to travel to educational institutions across states."
        ]
    }
];

export default function CareerPage() {
    const [selectedPosition, setSelectedPosition] = useState<string>(openPositions[0].title);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: ""
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full py-16 md:py-24 bg-slate-50 flex items-center justify-center overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10 text-center">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Careers</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Join Our Team & Shape the <span className="text-primary">Future of Education</span>
                    </h1>
                    <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        At Child Craft Hallmark Publishers, we create resources that inspire and empower young minds. 
                        If you are passionate about pedagogy, design, or supporting teachers, we'd love to work with you.
                    </p>
                </div>
            </section>

            {/* Why Join Us Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">Why Work With Us?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <FaPenNib className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Creative Freedom</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                We encourage innovative teaching models, bold graphic designs, and unique illustration styles.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                                <FaPaintBrush className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Legacy & Experience</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Work directly with veterans who have over 40 years of expertise in printing, publication, and curriculum development.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:shadow-md">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <FaChalkboardTeacher className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Direct Impact</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Your textbooks, visuals, and lesson guides will empower thousands of school children across the nation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-slate-50" id="positions">
                <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">Open Positions</h2>
                        <p className="text-slate-600 text-sm md:text-base mt-2">Find a role that fits your talents.</p>
                    </div>

                    <div className="space-y-6">
                        {openPositions.map((pos) => (
                            <div key={pos.title} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 transition-all hover:shadow-md flex flex-col md:flex-row gap-6 md:items-start">
                                <div className="p-4 bg-slate-50 rounded-xl self-start">
                                    {pos.icon}
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-xl font-bold text-slate-800">{pos.title}</h3>
                                            <span className="px-2.5 py-1 text-xs font-semibold text-primary bg-brand-bg rounded-full uppercase">
                                                {pos.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{pos.department}</p>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{pos.description}</p>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">Key Requirements:</h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 pl-1">
                                            {pos.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="self-end md:self-start">
                                    <button 
                                        onClick={() => {
                                            setSelectedPosition(pos.title);
                                            document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-lg shadow-sm transition-all"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-16 bg-white" id="apply-form">
                <div className="container mx-auto px-6 lg:px-8 max-w-3xl">
                    <div className="bg-slate-50 rounded-3xl border border-slate-100 p-8 md:p-12 shadow-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">Submit Your Application</h2>
                            <p className="text-slate-600 text-xs md:text-sm mt-2">Fill in your information and we will get back to you shortly.</p>
                        </div>

                        {isSubmitted ? (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Application Submitted!</h3>
                                <p className="text-slate-600 text-sm max-w-md mx-auto">
                                    Thank you for your interest in Child Craft Hallmark Publishers. Our academic/design team will review your portfolio and get in touch within 3-5 business days.
                                </p>
                                <button 
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
                                    }}
                                    className="px-6 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-sm font-bold rounded-xl transition-all"
                                >
                                    Submit Another Application
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Full Name</label>
                                        <div className="relative flex items-center">
                                            <FaUser className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="text" 
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="John Doe"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Email Address</label>
                                        <div className="relative flex items-center">
                                            <FaRegEnvelope className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="johndoe@example.com"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Phone Number</label>
                                        <div className="relative flex items-center">
                                            <FaPhone className="absolute left-4 text-slate-400 w-4 h-4" />
                                            <input 
                                                type="tel" 
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="+91 XXXXX XXXXX"
                                                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Position Applied For</label>
                                        <select 
                                            name="position"
                                            value={selectedPosition}
                                            onChange={(e) => setSelectedPosition(e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                        >
                                            {openPositions.map((pos) => (
                                                <option key={pos.title} value={pos.title}>{pos.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Resume / Portfolio Link</label>
                                    <div className="relative flex items-center">
                                        <FaLink className="absolute left-4 text-slate-400 w-4 h-4" />
                                        <input 
                                            type="url" 
                                            name="portfolio"
                                            value={formData.portfolio}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Google Drive, Dropbox, or LinkedIn URL"
                                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-700 tracking-wider block">Cover Letter / Message</label>
                                    <textarea 
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Describe your background and why you are excited to join us..."
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-slate-800 resize-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="submit"
                                        className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-sm sm:text-base"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
