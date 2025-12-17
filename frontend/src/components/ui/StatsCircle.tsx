"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UltraStatProps {
    label: string;
    value: number;
    progress?: number;
    icon?: React.ReactNode;
    accent?: string;
    size?: "sm" | "md" | "lg";
    description?: string;
    showCTA?: boolean;
    onCTA?: () => void;
    glow?: boolean;
    pulse?: boolean;
    floatingParticles?: boolean; // Kept in interface, but logic removed
}

// Function to handle counting animation (kept as it doesn't relate to 3D tilt/particles)
function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [target, duration]);
    return count;
}

// Function to respect user's motion preference (kept)
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return reduced;
}

interface InfoPopupProps {
    label: string;
    description?: string;
    onClose: () => void;
    accent: string;
    style?: React.CSSProperties;
}

const InfoPopup: React.FC<InfoPopupProps> = ({
    label,
    description,
    onClose,
    accent,
    style
}) => {
    return (
        <motion.div
            className="absolute z-50 origin-top-right w-64 md:w-72"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={style}
        >
            <div className="relative rounded-xl p-4 bg-white shadow-2xl border border-gray-100">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-sm font-bold text-gray-800 border-b pb-1 mb-2" style={{ borderBottomColor: accent + '40' }}>
                    {label} Details
                </h3>

                {description && (
                    <div>
                        <p className="text-gray-600 font-medium text-xs mb-1">Description:</p>
                        <p className="text-gray-700 text-xs italic bg-gray-50 p-1.5 rounded-md border border-gray-200">
                            {description}
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function UltraStat({
    label,
    value,
    progress = 80,
    icon,
    accent = "#EE9E26",
    size = "md",
    description,
    showCTA = false,
    onCTA,
    glow = true,
    pulse = true,
    floatingParticles = false, // NOTE: Changed default to false and removed Particles component
}: UltraStatProps) {

    const reduced = usePrefersReducedMotion();
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [popupStyle, setPopupStyle] = useState({});

    const sizeMap = {
        sm: { root: 120, inner: 70, ring: 8 },
        md: { root: 240, inner: 155, ring: 12 },
        lg: { root: 320, inner: 210, ring: 16 },
    };

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let currentSize: UltraStatProps['size'] = size;
    let responsiveRootSize: number;

    if (isMobile) {
        currentSize = "md";
        responsiveRootSize = 180;
    } else {
        responsiveRootSize = sizeMap[size].root;
    }

    const cfg = sizeMap[currentSize];

    const radius = cfg.inner / 2 - 8;
    const circumference = 2 * Math.PI * radius;
    const progressNormalized = Math.max(0, Math.min(100, progress));
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        if (reduced) {
            setOffset(circumference - (progressNormalized / 100) * circumference);
            return;
        }
        const start = performance.now();
        const duration = 1200;
        const targetOffset = circumference - (progressNormalized / 100) * circumference;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setOffset(circumference - eased * (progressNormalized / 100) * circumference);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [progressNormalized, reduced, circumference]);

    useEffect(() => {
        if (showDetailsPopup) {
            let top = 40;
            let right = 10;

            setPopupStyle({
                top: `${top}px`,
                right: `${right}px`,
            });
        }
    }, [showDetailsPopup]);

    // Removed mvX, mvY, rotateX, rotateY, handleMove, handleLeave

    const accentGrad = `grad-${accent.replace("#", "")}-${cfg.root}`;

    function shade(hex: string, percent: number) {
        try {
            const f = hex.slice(1);
            const R = parseInt(f.substring(0, 2), 16);
            const G = parseInt(f.substring(2, 4), 16);
            const B = parseInt(f.substring(4, 6), 16);
            const t = percent < 0 ? 0 : 255;
            const p = Math.abs(percent) / 100;
            return `rgb(${Math.round((t - R) * p + R)},${Math.round(
                (t - G) * p + G
            )},${Math.round((t - B) * p + B)})`;
        } catch {
            return hex;
        }
    }

    function defaultIcon() {
        return (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="white" />
                <path
                    d="M4 20c.3-2.7 3.6-4 8-4s7.7 1.3 8 4"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    // Removed Particles component

    return (
        <div
            ref={rootRef}
            tabIndex={0}
            className={`
                relative select-none rounded-3xl outline-none transform-gpu
                w-full max-w-xs mx-auto
                sm:w-[${responsiveRootSize}px]
                md:w-[31%]
                lg:w-[31%]
                xl:w-[31%]
            `}
            style={{
                height: isMobile ? responsiveRootSize : cfg.root,
                // Removed perspective: 1600, as it's not needed without 3D tilt
            }}
        >

            {/* Replaced motion.div with a regular div and removed rotateX/rotateY style */}
            <div
                className="absolute inset-0 rounded-3xl overflow-hidden bg-white/10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            />

            {glow && (
                <motion.div
                    animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -inset-5 rounded-3xl mix-blend-screen pointer-events-none"
                    style={{
                        background: `radial-gradient(600px 300px at 50% 20%, ${accent}44, transparent 60%)`,
                        filter: "blur(40px)",
                    }}
                />
            )}

            {pulse && (
                <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.25, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{
                        background: `radial-gradient(circle at 40% 60%, ${accent}22, transparent 70%)`,
                        filter: "blur(30px)",
                    }}
                />
            )}

            {/* Removed {floatingParticles && <Particles />} */}

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <svg
                    width={isMobile ? responsiveRootSize : cfg.root}
                    height={isMobile ? responsiveRootSize : cfg.root}
                    viewBox={`0 0 ${isMobile ? responsiveRootSize : cfg.root} ${isMobile ? responsiveRootSize : cfg.root}`}
                    className="rotate-[-90deg]"
                >
                    <defs>
                        <linearGradient id={accentGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={accent} />
                            <stop offset="70%" stopColor={shade(accent, -10)} />
                            <stop offset="100%" stopColor={shade(accent, -30)} />
                        </linearGradient>
                    </defs>

                    <circle
                        cx={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        cy={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        r={radius}
                        stroke="#e5e5e5"
                        strokeWidth={cfg.ring}
                        fill="transparent"
                        opacity={0.65}
                    />

                    <circle
                        cx={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        cy={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        r={radius}
                        stroke={`url(#${accentGrad})`}
                        strokeWidth={cfg.ring}
                        strokeLinecap="round"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: reduced ? "none" : "stroke-dashoffset 1.2s cubic-bezier(0.22,0.8,0.13,1)",
                        }}
                    />

                    <circle
                        cx={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        cy={(isMobile ? responsiveRootSize : cfg.root) / 2}
                        r={radius}
                        stroke={shade(accent, -10)}
                        strokeWidth={cfg.ring / 2}
                        strokeDasharray={`${circumference * 0.03} ${circumference}`}
                        transform={`rotate(${(progressNormalized / 100) * 360 - 12}, ${(isMobile ? responsiveRootSize : cfg.root) / 2}, ${(isMobile ? responsiveRootSize : cfg.root) / 2})`}
                        opacity={0.9}
                    />
                </svg>
            </div>

            <div
                className="absolute z-20 flex flex-col items-center justify-center rounded-full bg-white shadow-[0_15px_45px_rgba(0,0,0,0.22),inset_0_-8px_18px_rgba(0,0,0,0.06)]"
                style={{
                    width: cfg.inner,
                    height: cfg.inner,
                    top: `calc(50% - ${cfg.inner / 2}px)`,
                    left: `calc(50% - ${cfg.inner / 2}px)`,
                }}
            >
                <motion.div
                    className="absolute -top-3 -left-3 w-16 h-16 rounded-full flex items-center justify-center shadow-xl"
                    initial={{ scale: 0.8, rotate: -10, y: -6 }}
                    animate={{ scale: 1, rotate: 0, y: -10 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{
                        background: `linear-gradient(160deg, ${accent}, ${shade(accent, -20)})`,
                        border: "4px solid rgba(255,255,255,0.25)",
                    }}
                >
                    <div className="text-white text-xl">{icon ?? defaultIcon()}</div>
                </motion.div>

                <div className="text-center px-3 mt-6">
                    <div className="text-sm font-bold text-gray-800 tracking-wider mb-1">{label}</div>
                    <div className="text-xs text-gray-500 max-w-[180px] leading-snug">
                        {description || "Live Updated"}
                    </div>
                </div>
            </div>

            <motion.button
                className="absolute right-3 top-3 z-30 rounded-full w-8 h-8 flex items-center justify-center bg-white/70 border border-white/40 shadow hover:scale-105 transition"
                onClick={() => setShowDetailsPopup(!showDetailsPopup)}
            >
                <svg width="14" height="14" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="1.4" opacity="0.4" fill="none" />
                    <circle cx="12" cy="8" r="1" fill="#222" />
                    <path d="M12 11v5" stroke="#222" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {showDetailsPopup && (
                    <InfoPopup
                        label={label}
                        description={description}
                        onClose={() => setShowDetailsPopup(false)}
                        accent={accent}
                        style={popupStyle}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}