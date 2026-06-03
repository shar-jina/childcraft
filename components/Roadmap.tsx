"use client";
import React, { useEffect, useState, useRef } from "react";

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
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A5C96] to-[#053c60] relative overflow-hidden" id="homepage-roadmap">
            {/* Decorative background gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-sky-300 uppercase mb-2 block">Our Growth Journey</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Childcraft <span className="text-sky-300">Roadmap</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto mt-2 font-light">
                        Stepping stones of dedication, innovation, and educational excellence since inception.
                    </p>
                </div>

                {/* Timeline Branch Container */}
                <div ref={containerRef} className="relative max-w-4xl mx-auto">
                    {/* Vertical Center Line */}
                    <div 
                        className="absolute left-[20px] lg:left-1/2 -translate-x-[2px] top-0 bottom-0 w-[4px] bg-gradient-to-b from-sky-400 via-blue-300 to-white rounded-full z-0 transition-transform duration-1000 origin-top"
                        style={{
                            transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                        }}
                    ></div>

                    {/* Timeline Milestones - compact space-y-6 */}
                    <div className="space-y-6 relative z-10">
                        {milestones.map((milestone, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div 
                                    key={idx} 
                                    className={`flex flex-col lg:flex-row items-start lg:items-center w-full relative transition-all duration-700 ease-out ${
                                        isEven ? "lg:flex-row-reverse" : ""
                                    }`}
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? "translateY(0)" : "translateY(16px)",
                                        transitionDelay: `${idx * 150}ms`,
                                    }}
                                >
                                    {/* Card Block */}
                                    <div className="w-full lg:w-[46%] pl-12 lg:pl-0">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 hover:bg-white/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative group">
                                            <span className="text-2xl font-extrabold text-sky-300 block mb-1">{milestone.year}</span>
                                            <h3 className="text-base font-bold text-white mb-1 group-hover:text-sky-200 transition-colors">{milestone.title}</h3>
                                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">{milestone.desc}</p>
                                            
                                            {/* Decorative indicator triangle for desktop */}
                                            <div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent ${
                                                isEven 
                                                    ? "-left-3 border-r-8 border-r-white/10" 
                                                    : "-right-3 border-l-8 border-l-white/10"
                                            }`}></div>
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div 
                                        className={`absolute left-[20px] lg:left-1/2 -translate-x-1/2 top-7 lg:top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#053c60] border-4 border-sky-400 flex items-center justify-center shadow-md z-20 shrink-0 transition-all duration-500 ${
                                            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                        }`}
                                        style={{
                                            transitionDelay: `${idx * 150}ms`,
                                        }}
                                    >
                                        <span className="w-3 h-3 rounded-full bg-sky-300 animate-pulse"></span>
                                    </div>

                                    {/* Empty spacer block to maintain flex layout structure on desktop */}
                                    <div className="hidden lg:block w-[46%]"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
