"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Book {
    id: number;
    title: string;
    image: string;
    syllabus: string;
    description: string;
}

const bookData: Record<string, Book[]> = {
    "Std 1": [
        {
            id: 1,
            title: "English Reader",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "CBSE",
            description: "An engaging course designed around interactive stories, grammar basics, and vocabulary builders for first-grade CBSE students.",
        },
        {
            id: 2,
            title: "Hindi Praveshika",
            image: "/images/bookscover/std1hindi.jpeg",
            syllabus: "ICSE",
            description: "Introduction to Hindi scripts, simple poems, and basic vocabulary designed for ICSE curriculum guidelines.",
        },
        {
            id: 3,
            title: "Mathematics",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "State Syllabus",
            description: "Foundation mathematical concepts, number recognition, addition, and subtraction for State Board standards.",
        },
        {
            id: 4,
            title: "Environmental Studies",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "State Syllabus",
            description: "Interactive course exploring nature, community, hygiene, and daily habits for State Board first graders.",
        },
        {
            id: 5,
            title: "General Knowledge",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Fun quizzes, world facts, and basic science facts to nurture curious minds in CBSE standard 1.",
        },
    ],
    "Std 2": [
        {
            id: 6,
            title: "Mathematics",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "CBSE",
            description: "Conceptual math course with illustrative problem solving, shapes, and division concepts aligned with CBSE guidelines.",
        },
        {
            id: 7,
            title: "Term Book",
            image: "/images/bookscover/std2term2.jpeg",
            syllabus: "ICSE",
            description: "Comprehensive term material cover for core sciences, English, and social studies in the ICSE framework.",
        },
        {
            id: 8,
            title: "Environment",
            image: "/images/bookscover/std2sem2.jpeg",
            syllabus: "State Syllabus",
            description: "Introduction to Environmental Studies, plants, animals, and local geography under State Board guidelines.",
        },
        {
            id: 9,
            title: "English Grammar",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "CBSE",
            description: "Key grammar rules, punctuation, sentence building, and worksheets for second-grade CBSE students.",
        },
        {
            id: 10,
            title: "Hindi Pathmala",
            image: "/images/bookscover/std3hindi.jpeg",
            syllabus: "ICSE",
            description: "Hindi prose reading comprehension, grammar foundations, and poems tailored for Std 2 ICSE learners.",
        },
    ],
    "Std 3": [
        {
            id: 11,
            title: "Science Explorer",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Explores core scientific themes, life cycles, and nature patterns with interactive exercises for CBSE Std 3.",
        },
        {
            id: 12,
            title: "Hindi Pathmala",
            image: "/images/bookscover/std3hindi.jpeg",
            syllabus: "ICSE",
            description: "Advanced vocabulary, short stories, and grammatical structures tailored for Std 3 ICSE scholars.",
        },
        {
            id: 13,
            title: "Term Book",
            image: "/images/bookscover/std3term1.jpeg",
            syllabus: "State Syllabus",
            description: "Full term coverage containing environmental science, regional language, and mathematics for State Board.",
        },
        {
            id: 14,
            title: "Social Studies",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Introduction to society, civic responsibilities, transport, and national symbols for CBSE Std 3.",
        },
        {
            id: 15,
            title: "Art & Craft",
            image: "/images/bookscover/std1hindi.jpeg",
            syllabus: "State Syllabus",
            description: "Creative coloring, paper craft, drawing techniques, and DIY activities for third-grade State curriculum.",
        },
    ],
    "Std 4": [
        {
            id: 16,
            title: "General Studies",
            image: "/images/bookscover/std3sem2.jpeg",
            syllabus: "CBSE",
            description: "Advanced social sciences, history, and scientific methods for standard 4 CBSE students.",
        },
        {
            id: 17,
            title: "Math Mastery",
            image: "/images/bookscover/std4term2.jpeg",
            syllabus: "ICSE",
            description: "High-level arithmetic, fractions, decimals, and basic geometry problems designed for ICSE guidelines.",
        },
        {
            id: 18,
            title: "General Science",
            image: "/images/bookscover/std4term2.jpeg",
            syllabus: "State Syllabus",
            description: "State board aligned curriculum covering human systems, physics basics, and plant physiology.",
        },
        {
            id: 19,
            title: "English Grammar",
            image: "/images/bookscover/std2term2.jpeg",
            syllabus: "ICSE",
            description: "Advanced grammar syntax, composition writing, essay drafting, and comprehension skills for ICSE Std 4.",
        },
        {
            id: 20,
            title: "Computer Science",
            image: "/images/bookscover/std1term1.jpeg",
            syllabus: "State Syllabus",
            description: "Foundational guide to computer software, MS Office basics, typing, and safe internet browsing for State Board.",
        },
    ],
};

const NewArrivals = () => {
    const [selectedClass, setSelectedClass] = useState<string>("Std 1");
    const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);

    const currentBooks = bookData[selectedClass] || [];
    const activeBook = currentBooks[selectedBookIndex] || currentBooks[0];

    const getPositionStyle = (idx: number, total: number) => {
        const minLeft = 4;
        const maxLeft = 76;
        const leftPercent = total > 1 ? minLeft + (idx * (maxLeft - minLeft)) / (total - 1) : 38;
        return {
            left: `${leftPercent}%`,
        };
    };

    return (
        <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden" id="homepage-arrivals">
            <style jsx>{`
                .book-shelf-container {
                    perspective: 1200px;
                }
                .shelf-book {
                    transform-style: preserve-3d;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Heading */}
                <div className="text-center mb-12">
                    <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-3 block">Textbook Showcase</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
                        New <span className="text-primary">Arrivals</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light">
                        Explore our latest publications grouped by curriculum boards and standards.
                    </p>
                </div>

                {/* Class Tabs */}
                <div className="flex justify-center gap-3 md:gap-6 mb-16 overflow-x-auto py-2">
                    {Object.keys(bookData).map((cls) => (
                        <button
                            key={cls}
                            onClick={() => {
                                setSelectedClass(cls);
                                setSelectedBookIndex(0);
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all shrink-0 shadow-sm border ${
                                selectedClass === cls
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-white text-slate-700 border-gray-100 hover:border-primary/20 hover:text-primary"
                            }`}
                        >
                            {cls}
                        </button>
                    ))}
                </div>

                {/* Display Grid (Split Details & Animated Bookshelf) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Left side: Book details */}
                    <div className="flex flex-col text-left space-y-6 md:pr-8">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-full bg-brand-bg text-primary font-bold text-xs uppercase tracking-wider border border-blue-100">
                                {selectedClass}
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                                {activeBook.syllabus}
                            </span>
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight transition-all duration-300">
                            {selectedClass} - {activeBook.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light min-h-[80px]">
                            {activeBook.description}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-3">
                            <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-sm sm:text-base">
                                Request Specimen Copy
                            </button>
                            <button className="px-6 py-3 border border-gray-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all text-sm sm:text-base">
                                View Index Structure
                            </button>
                        </div>
                    </div>

                    {/* Right side: 3D Bookshelf */}
                    <div className="book-shelf-container relative w-full h-[220px] sm:h-[280px] md:h-[340px] flex flex-col justify-end">
                        {/* Books Wrapper */}
                        <div className="relative w-full h-full">
                            {currentBooks.map((book, idx) => {
                                const isActive = selectedBookIndex === idx;
                                return (
                                    <div
                                        key={book.id}
                                        onClick={() => setSelectedBookIndex(idx)}
                                        style={getPositionStyle(idx, currentBooks.length)}
                                        className={`absolute w-12 h-16 sm:w-16 sm:h-22 md:w-22 md:h-30 lg:w-26 lg:h-36 shelf-book cursor-pointer ${
                                            isActive
                                                ? "bottom-4 scale-110 md:scale-120 z-30 opacity-100"
                                                : "bottom-1 scale-90 z-10 opacity-65 hover:opacity-90 hover:scale-95"
                                        }`}
                                    >
                                        {/* The 3D Book Layout */}
                                        <div className={`w-full h-full relative shadow-2xl rounded-r-md overflow-hidden bg-white border-l border-white/20 transition-all ${
                                            isActive ? "ring-2 ring-primary/45" : ""
                                        }`}>
                                            <Image
                                                src={book.image}
                                                alt={book.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 25vw, 15vw"
                                                priority={idx === 0}
                                            />
                                            {/* Dynamic spine highlight effect */}
                                            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/25 via-transparent to-black/10 z-10"></div>
                                            {/* Sheen effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-15 pointer-events-none"></div>
                                        </div>
                                        {/* Real-looking drop shadow underneath the book */}
                                        <div className="absolute -bottom-4 left-2 right-2 h-2.5 bg-black/35 blur-md rounded-full transform rotateX(95deg) pointer-events-none"></div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Wooden Shelf Base */}
                        <div className="w-full h-4 bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] rounded shadow-md border-t border-[#A06D3B] relative z-20"></div>
                        {/* Support brackets underneath shelf */}
                        <div className="absolute left-[15%] bottom-[-16px] md:bottom-[-20px] w-5 md:w-6 h-4 md:h-5 bg-[#5C3A21] rounded-b-md shadow-md z-15"></div>
                        <div className="absolute right-[15%] bottom-[-16px] md:bottom-[-20px] w-5 md:w-6 h-4 md:h-5 bg-[#5C3A21] rounded-b-md shadow-md z-15"></div>
                        {/* Shelf shadow underneath */}
                        <div className="w-[90%] mx-auto h-4 bg-black/15 blur-lg rounded-full mt-1"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
