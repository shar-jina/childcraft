"use client";
import React from "react";

const milestones = [
    {
        year: "2014",
        title: "The Inception",
        desc: "Child Craft Hallmark Publishers was founded in May 2014 with a vision to create meaningful educational resources that inspire learning and nurture creativity.",
    },
    {
        year: "2018",
        title: "Academic Leadership",
        desc: "Strengthened by Director Mrs. Reena Vishwanathan's 20+ years of expertise spanning content development, book design, teacher training, and academic administration.",
    },
    {
        year: "2022",
        title: "Publishing Legacy",
        desc: "Guided by Managing Director Mr. V. A. Vishwanathan's 40+ years of extensive experience in educational publishing, establishing a strong foundation of trust.",
    },
    {
        year: "2026",
        title: "12 Years of Service",
        desc: "Proudly completing twelve years of dedicated service, continually evolving to meet the changing needs of schools, educators, and young learners.",
    },
];

export default function Roadmap() {
    return (
        <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden" id="homepage-roadmap">
            {/* Decorative background gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-3 block">Our Growth Journey</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight">
                        Childcraft <span className="text-primary">Roadmap</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-light">
                        Stepping stones of dedication, innovation, and educational excellence since inception.
                    </p>
                </div>

                {/* Timeline Grid */}
                <div className="relative">
                    {/* Center connector line for desktop */}
                    <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[4px] bg-slate-200 z-0">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 w-full rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                        {milestones.map((milestone, idx) => (
                            <div key={idx} className="group relative flex flex-col items-center text-center lg:text-left lg:items-start h-full">
                                {/* Connector Dot */}
                                <div className="w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 z-10 mb-6 lg:mb-8 shrink-0">
                                    <span className="w-3.5 h-3.5 rounded-full bg-primary animate-pulse"></span>
                                </div>
 
                                {/* Content Card */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 w-full flex-1 flex flex-col">
                                    <span className="text-3xl font-extrabold text-primary/20 block mb-2">{milestone.year}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{milestone.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed font-light flex-1">{milestone.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
