"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Banner = () => {
    const images = [

        "/images/banner3.png",
        "/images/banner222.png",
        "/images/banner45.png",

    ];

    const [current, setCurrent] = useState(0);

    const next = () =>
        setCurrent((prev) => (prev + 1) % images.length);

    const prev = () =>
        setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const getStyles = (index: number) => {
        // Handle circular index distance
        const length = images.length;
        // Calculate distance from current index (-1, 0, 1 etc)
        // We want the shortest path distance in a circle
        let diff = index - current;

        // Adjust diff to be shortest path
        if (diff > length / 2) diff -= length;
        if (diff < -length / 2) diff += length;

        const isCenter = diff === 0;
        const isLeft = diff === -1;
        const isRight = diff === 1;

        // Base styles for all items
        let styles: React.CSSProperties = {
            transition: "all 0.7s ease-in-out",
            position: "absolute",
            zIndex: 10,
            opacity: 0,
            transform: "translateX(0) scale(0.8) rotateY(0deg)", // Default hidden state
        };

        if (isCenter) {
            styles = {
                ...styles,
                zIndex: 30,
                opacity: 1,
                transform: "translateX(0px) scale(1) rotateY(0deg)",
            };
        } else if (isLeft) {
            styles = {
                ...styles,
                zIndex: 20,
                opacity: 0.8,
                transform: "translateX(-220px) scale(0.8) rotateY(35deg)",
            };
        } else if (isRight) {
            styles = {
                ...styles,
                zIndex: 20,
                opacity: 0.8,
                transform: "translateX(220px) scale(0.8) rotateY(-35deg)",
            };
        } else {
            // For items adjacent to left/right loop (seamless) or hidden
            // To make it look like a loop, we might need more logic or just hide distant ones
            styles = { ...styles, opacity: 0, zIndex: 0 };
        }

        return styles;
    };

    return (
        <div className="relative w-full h-[480px] bg-sky-50 overflow-hidden flex items-center justify-center ">
            {/* Perspective Container */}
            <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "1000px" }}
            >
                {images.map((img, index) => (
                    <div
                        key={index}
                        style={getStyles(index)}
                        className="absolute shadow-2xl rounded-2xl overflow-hidden bg-white w-[250px] sm:w-[300px] aspect-3/4"
                    >
                        <Image
                            src={img}
                            alt={`banner-${index}`}
                            fill
                            className="object-cover"
                            priority={index === current}
                        />
                        {/* Book spine effect (gradient overlay) */}
                        <div className="absolute inset-y-0 left-0 w-[4%] bg-linear-to-r from-black/20 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-[1%] bg-linear-to-l from-black/10 to-transparent pointer-events-none"></div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={prev}
                className="absolute left-4 sm:left-10 z-40 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button
                onClick={next}
                className="absolute right-4 sm:right-10 z-40 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Banner;
