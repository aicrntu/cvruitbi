"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getEventById } from "@/services/event.service";
import { getImageUrl } from "@/helpers/image";
import { ChevronLeft, X } from "lucide-react";
import BannerWrapper from "@/components/about/AboutBannerWrapper";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await getEventById(id as string);
      if (res.success) setEvent(res.data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="py-12 text-center text-sm text-gray-500">Loading...</div>;
  if (!event) return <div className="py-12 text-center text-sm">Event not found.</div>;

  return (
    <>
      <BannerWrapper
        heading="Events Section"
        subtitle="Explore our events and programs."
      />

      <section className="container-global py-8 max-w-5xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ChevronLeft size={14} /> Back
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{event.event_name}</h1>
            
            <div className="flex flex-wrap gap-4 text-[10px] md:text-[11px] uppercase tracking-wider text-gray-400 mb-6 font-bold">
              {event.event_date && <span>{new Date(event.event_date).toDateString()}</span>}
              {event.venue && <span>• {event.venue}</span>}
              {event.isPress === 1 && <span className="text-green-600 border border-green-200 px-2 py-0.5 rounded">Press Event</span>}
            </div>

            {event.title_img && (
              <div 
                className="relative w-full aspect-video md:max-w-md rounded-lg overflow-hidden mb-6 cursor-zoom-in shadow-sm bg-gray-50"
                onClick={() => setSelectedImage(getImageUrl(event.title_img))}
              >
                <Image
                  src={getImageUrl(event.title_img)}
                  alt={event.event_name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase mb-2 text-gray-800 tracking-tight">About</h2>
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{event.event_desc}</p>
              </div>

              {event.objective && (
                <div className="bg-gray-50 p-4 rounded-lg border-l-2 border-gray-200 max-w-2xl">
                  <h2 className="text-[10px] font-bold uppercase mb-1 text-gray-500">Objective</h2>
                  <p className="text-sm text-gray-600 italic">"{event.objective}"</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Event Info</h2>
            {event.key_speaker && <Detail label="Speaker" value={event.key_speaker} />}
            {event.organizer && <Detail label="Organizer" value={event.organizer} />}
            {event.targeted_audience && <Detail label="Audience" value={event.targeted_audience} />}
            {event.venue && <Detail label="Venue" value={event.venue} />}
          </div>
        </div>

        {event.images?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-xs font-bold uppercase mb-4 text-gray-400 tracking-widest">Gallery Preview</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {event.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded overflow-hidden cursor-pointer hover:ring-2 ring-blue-500 ring-offset-2 transition-all bg-gray-100"
                  onClick={() => setSelectedImage(getImageUrl(img))}
                >
                  <Image
                    src={getImageUrl(img)}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedImage && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white transition-transform hover:scale-110"><X size={30} /></button>
            <div className="relative w-full h-full">
              <Image src={selectedImage} alt="Full screen preview" fill className="object-contain" unoptimized />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-100 p-3 rounded-md shadow-sm">
      <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">{label}</p>
      <p className="text-xs font-semibold text-gray-800 leading-tight">{value}</p>
    </div>
  );
}