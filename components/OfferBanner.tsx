"use client";
import React from "react";
import Link from "next/link";

export default function OfferBanner() {
    return (
        <section className="py-12 md:py-20 bg-slate-50 relative" id="homepage-offer">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="relative bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
                    {/* Glowing background highlights */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 pointer-events-none"></div>

                    {/* Left text */}
                    <div className="flex-1 text-center md:text-left relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sky-300 font-semibold text-xs uppercase tracking-wider mb-6 border border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-ping"></span>
                            2026 Academic Season Offer
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight leading-tight">
                            Partner with Us & Save up to 20%
                        </h2>
                        <p className="text-base text-slate-300 max-w-xl leading-relaxed font-light">
                            Get exclusive institutional rates, free teacher guidekits, and curriculum orientation workshops for your entire school faculty.
                        </p>
                    </div>

                    {/* Right CTA button */}
                    <div className="relative z-10 shrink-0">
                        <Link
                            href="/contact?ref=academic-offer"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white hover:bg-sky-50 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Request Institutional Quote
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
