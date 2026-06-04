"use client";

import React from "react";
import Image from "next/image";
const BookOutline = () => {
    const features = [
        {
            id: 1,
            text: "Colorful and attractive",
            color: "bg-green-600"
        },
        {
            id: 2,
            text: "Clear, Simple and Precise",
            color: "bg-orange-500"
        },
        {
            id: 3,
            text: "Activity based worksheets and assessments",
            color: "bg-rose-500"
        },
        {
            id: 4,
            text: "Concepts are supported by suitable examples",
            color: "bg-blue-600"
        },
        {
            id: 5,
            text: "Content is age-appropriate",
            color: "bg-blue-600"
        },
        {
            id: 6,
            text: "Student, Teacher, and Parent friendly books",
            color: "bg-orange-500"
        },
        {
            id: 7,
            text: "each subject book has proper planning for lesson which supports the teacher to plan the class-time accordingly",
            color: "bg-slate-400"
        },

    ];

    return (
        <section className="w-full pt-10 md:pt-16 pb-0 bg-white relative overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">

                {/* Left Side */}
                <div className="flex flex-col space-y-8 lg:sticky lg:top-24 self-start h-full relative">
                    <div className="flex flex-col h-full relative">
                        {/* Decorative Dot Pattern - Background */}
                        <div className="absolute top-0 left-0 grid grid-cols-6 gap-2 w-fit opacity-60 pointer-events-none">
                            {[...Array(36)].map((_, i) => {
                                const colors = ["bg-blue-400", "bg-rose-400", "bg-orange-400", "bg-green-400", "bg-slate-300"];
                                const color = colors[i % colors.length];
                                return (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${color} ${i % 3 === 0 ? 'opacity-60' : 'opacity-100'}`}></div>
                                );
                            })}
                        </div>
                        {/* Title */}
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 relative z-10 pt-8">
                            Our Books <span className="text-primary">Outline</span>
                        </h2>

                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 relative z-10">
                            Whether a book will ultimately be read on paper or an e-reader, interior book design can make or break a reader&apos;s enjoyment of a book. Book layouts are particular and definitely not one-size-fits-all. The design also must be adjusted for the style and genre of the book
                        </p>

                        {/* Book Image */}
                        <div className="mt-auto">
                            <Image
                                src="/images/book3.jpeg"
                                alt="Composite Mathematics"
                                width={400}
                                height={250}
                                className="rounded-xl shadow-lg object-contain"
                            />
                        </div>

                    </div>
                </div>

                {/* Right Side - Numbered List */}
                <div className="space-y-6">
                    {features.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 md:gap-6 group">
                            <div className={`shrink-0 w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                {item.id}
                            </div>
                            <p className="text-gray-700 text-lg font-medium pt-1">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Stats Box Section - Full Width Container */}
            <div className="mt-20 w-full relative z-20">
                {/* Visual Trick: bottom half has the background of the next section (dark blue [#053c60]) */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-blue-900"></div>

                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-bold text-primary">400+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Titles</p>
                        </div>
                        <div className="space-y-2 md:border-l md:border-r border-slate-100">
                            <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">3000+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Schools</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">12+</h3>
                            <p className="text-gray-600 font-medium text-lg uppercase tracking-wide">Years of Service</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookOutline;
