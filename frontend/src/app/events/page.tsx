"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BannerWrapper from "@/components/about/AboutBannerWrapper";
import { getAllEvents } from "@/services/event.service";
import EventCard from "@/components/ui/EventCard";
import { getImageUrl } from "@/helpers/image";

function getFullDate(dateString: string) {
    const d = new Date(dateString);
    return {
        day: d.getDate(),
        monthYear: d.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }),
    };
}

export default function EventPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        (async () => {
            const res = await getAllEvents();
            if (res.success && res.data) {
                setEvents(res.data.reverse()); // newest first
            }
        })();
    }, []);

    const filtered = events.filter((e) =>
        e.event_name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <BannerWrapper
                heading="Events Section"
                subtitle="Explore our events and programs."
            />

            <section className="relative bg-gradient-to-b from-[#f8fdff] to-white text-[#0b1220] py-14 overflow-hidden">
                <div className="container-global px-4 md:px-8 lg:px-12">

                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                                All <span className="text-[#00d2ef]">Events</span>
                            </h2>
                            <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-sm">
                                Browse our latest events and activities.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 
                            w-full md:w-[200px] shadow-sm hover:shadow-md transition-all">
                            <input
                                type="text"
                                placeholder="Search event..."
                                className="w-full bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* COUNTER */}
                    <div className="text-xs text-gray-500 mb-5">
                        Showing{" "}
                        <span className="font-semibold text-[#00b5d6]">{filtered.length}</span>{" "}
                        of{" "}
                        <span className="font-semibold text-[#00b5d6]">{events.length}</span>{" "}
                        events
                    </div>

                    {/* GRID (Event Cards) */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {filtered.map((ev) => {
                            const fullDate = getFullDate(ev.event_date);

                            return (
                                <EventCard
                                    key={ev._id}
                                    image={getImageUrl(ev.title_img)}
                                    title={ev.event_name}
                                    description={ev.event_desc}
                                    speaker={ev.key_speaker}
                                    fullDate={fullDate}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50%] h-[150px] bg-[#00d2ef]/10 blur-2xl rounded-full" />
            </section>
        </>
    );
}
