"use client";

import React from "react";
import SortBar from "./SortBar";

interface Props {
    stage?: string;
    setStage: (s?: string) => void;
    year?: string;
    setYear: (y?: string) => void;
    search: string;
    setSearch: (s: string) => void;
    onSearch?: () => void;

    sortOrder: "newest" | "oldest";
    setSortOrder: (s: "newest" | "oldest") => void;
}

const STAGES = ["Ideation", "Prototype", "Early Stage", "Growth Stage", "Established"];

function generateYears(count = 6) {
    const current = new Date().getFullYear();
    return Array.from({ length: count }).map((_, i) => String(current - i));
}

export default function FilterBar({
    stage,
    setStage,
    year,
    setYear,
    search,
    setSearch,
    onSearch,
    sortOrder,
    setSortOrder
}: Props) {
    const years = generateYears(8);

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="
                    grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-5 
                    gap-3
                    items-center
                    "
                >
                {/* Stage Filter */}
                <select
                    className="border p-2 rounded w-full text-[11px] bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={stage ?? ""}
                    onChange={(e) => setStage(e.target.value || undefined)}
                >
                    <option value="">All Stages</option>
                    {STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                {/* Year Filter */}
                <select
                    className="border p-2 rounded w-full text-[11px] bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={year ?? ""}
                    onChange={(e) => setYear(e.target.value || undefined)}
                >
                    <option value="">All Years</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                {/* Search */}
                <input
                    type="search"
                    placeholder="Search startup, founder, email..."
                    className="border p-2 rounded w-full text-[11px] bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
                />

                {/* Buttons & Sort */}
                <div className="
                    flex items-center gap-2 
                    sm:col-span-2 
                    md:col-span-2 
                    justify-end
                    "
                >
                    <button
                        className="px-3 py-1.5 bg-blue-600 text-white rounded text-[11px] hover:bg-blue-700 transition"
                        onClick={() => onSearch?.()}
                    >
                        Apply
                    </button>

                    <button
                        className="px-3 py-1.5 border rounded text-[11px] hover:bg-gray-100 transition"
                        onClick={() => {
                            setStage(undefined);
                            setYear(undefined);
                            setSearch("");
                            onSearch?.();
                        }}
                    >
                        Reset
                    </button>

                    {/* Sort Component */}
                    <div className="min-w-[80px]">
                        <SortBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
                    </div>
                </div>
            </div>
        </div>
    );

}
