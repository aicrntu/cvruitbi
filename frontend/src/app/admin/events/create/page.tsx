"use client";

import { useState, ChangeEvent } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { createEvent } from "@/services/event.service";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

// --- Custom Components for better UI ---

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

// --- Main Component ---

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    event_name: "",
    event_desc: "",
    objective: "",
    event_date: "",
    venue: "",
    key_speaker: "",
    targeted_audience: "",
    organizer: "",
    isPress: false,
  });

  const [titleImg, setTitleImg] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, k === "isPress" ? (v ? "1" : "0") : String(v)));

      if (titleImg) fd.append("title_img", titleImg);
      images.forEach((img) => fd.append("images", img));

      const res = await createEvent(fd);

      if (res.success) {
        router.push("/admin/events");
      } else {
        setError("Event creation failed. Please check your inputs.");
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      setError(error.response?.data?.message || "An unexpected error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <ProtectedRoute>
      <div className="p-4 bg-gray-50 flex justify-center">
        {/* max-w-3xl for the 40% smaller container size */}
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-8">

          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Create New Event</h2>

          {/* Form Content */}
          <div className="space-y-6">
            <fieldset className="border p-4 rounded-lg space-y-4">
              <legend className="text-lg font-semibold text-gray-700 px-2">Event Details</legend>
              
              {/* 3 Columns Grid for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <FormField label="Event Name">
                  <input
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500"
                    name="event_name"
                    placeholder="e.g., Annual Tech Conference"
                    onChange={handleChange}
                  />
                </FormField>

                <FormField label="Event Date">
                  <input
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500"
                    type="date"
                    name="event_date"
                    onChange={handleChange}
                  />
                </FormField>
                
                <FormField label="Venue">
                  <input 
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500" 
                    name="venue" 
                    placeholder="e.g., Convention Center Hall A" 
                    onChange={handleChange} 
                  />
                </FormField>

                <FormField label="Key Speaker">
                  <input 
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500" 
                    name="key_speaker" 
                    placeholder="e.g., Dr. Jane Doe" 
                    onChange={handleChange} 
                  />
                </FormField>

                <FormField label="Targeted Audience">
                  <input 
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500" 
                    name="targeted_audience" 
                    placeholder="e.g., Tech Professionals" 
                    onChange={handleChange} 
                  />
                </FormField>
                
                <FormField label="Organizer">
                  <input 
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500" 
                    name="organizer" 
                    placeholder="e.g., The Events Team" 
                    onChange={handleChange} 
                  />
                </FormField>

                {/* Blank field for alignment on 3-column grid */}
 
                {/* isPress Checkbox - Full width on mobile, right-aligned on desktop */}
                <div className="flex items-center pt-5">
                  <input
                    type="checkbox"
                    id="isPress"
                    name="isPress"
                    checked={form.isPress}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPress" className="ml-2 text-sm font-medium text-gray-700">
                    Press Event
                  </label>
                </div>
              </div>

              {/* Textareas spanning 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Event Description">
                  <textarea
                    name="event_desc"
                    placeholder="A detailed description..."
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500 col-span-3"
                    onChange={handleChange}
                    rows={3}
                  />
                </FormField>

                <FormField label="Objective">
                  <textarea
                    name="objective"
                    placeholder="The main Objective..."
                    className="border p-2 rounded w-full text-sm focus:ring-blue-500 focus:border-blue-500 col-span-3"
                    onChange={handleChange}
                    rows={3}
                  />
                </FormField>
              </div>
            </fieldset>

            {/* Image Uploads */}
            <fieldset className="border p-4 rounded-lg space-y-4">
              <legend className="text-lg font-semibold text-gray-700 px-2">Event Media</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Title Image */}
                <FormField label="Title Image (Required)">
                  <input
                    type="file"
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => setTitleImg(e.target.files?.[0] || null)}
                  />
                  
                  {titleImg && (
                    <div className="relative inline-block mt-2">
                      <img
                        src={URL.createObjectURL(titleImg)}
                        alt="Title preview"
                        className="w-24 h-24 border rounded object-cover shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => setTitleImg(null)}
                        className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1.5 text-xs hover:bg-red-700 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </FormField>

                {/* Multi Images */}
                <FormField label="Event Images (Gallery)">
                  <input
                    type="file"
                    multiple
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => setImages(Array.from(e.target.files || []))}
                  />

                  <div className="flex gap-3 mt-2 flex-wrap">
                    {images.map((img, i) => (
                      <div key={i} className="relative inline-block">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Gallery preview ${i + 1}`}
                          className="w-20 h-20 object-cover border rounded shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1.5 text-xs hover:bg-red-700 transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </FormField>
              </div>
            </fieldset>
          </div>

          {error && <p className="text-red-600 text-sm mt-4 p-2 bg-red-50 border border-red-200 rounded">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}