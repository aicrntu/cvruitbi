"use client";

import { useEffect, useState, ChangeEvent } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";

import { getEventById, updateEvent } from "@/services/event.service";
import { EventData } from "@/types/event.types";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  ArrowLeft,
} from "lucide-react";

import EventInputsGrid from "@/components/events/EventInputsGrid";
import TitleImageInput from "@/components/events/TitleImageInput";
import MultipleImages from "@/components/events/MultipleImages";

import EventImageModal from "@/components/events/EventImageModal";
import { getImageUrl } from "@/helpers/image";

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Partial<EventData>>({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [titleImg, setTitleImg] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const allowedFields: (keyof EventData)[] = [
    "event_code",
    "event_name",
    "event_desc",
    "objective",
    "event_date",
    "venue",
    "key_speaker",
    "targeted_audience",
    "organizer",
  ];

  useEffect(() => {
    (async () => {
      try {
        if (!id) return setError("Invalid Event ID");

        const res = await getEventById(id as string);
        if (!res.success || !res.data) {
          return setError("Event not found");
        }
        setForm(res.data);
      } catch {
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) =>
      prev
        ? {
          ...prev,
          [name]: value,
        }
        : prev
    );
  };

  const openModal = (url: string) => {
    setModalImageSrc(url);
    setShowModal(true);
  };

  const allImages = [
    ...(form?.images || []).map((url, index) => ({
      url: getImageUrl(url),
      isNew: false,
      originalIndex: index,
    })),
    ...images.map((file, index) => ({
      url: URL.createObjectURL(file),
      isNew: true,
      file,
      originalIndex: index,
    })),
  ];

  const handleUpdate = async () => {
    if (!form) return;

    setIsUpdating(true);
    setError("");
    setSuccess("");

    try {
      const fd = new FormData();

      allowedFields.forEach((field) => {
        const val = form[field];
        if (val) fd.append(field, val.toString());
      });

      if (titleImg) fd.append("title_img", titleImg);
      images.forEach((file) => fd.append("images", file));

      fd.append("removed_images", JSON.stringify(removedImages));

      const res = await updateEvent(id as string, fd);

      if (!res.success) {
        setError("Update failed");
        return;
      }

      router.push("/admin/events");
    } catch {
      setError("Server error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (error && !form) return <p>{error}</p>;

  const titleImageUrl =
    titleImg?.name
      ? URL.createObjectURL(titleImg)
      : form?.title_img
        ? getImageUrl(form.title_img)
        : "";

  return (
    <ProtectedRoute>
      <div className="p-4 flex justify-center">
        <div className="max-w-4xl mx-auto">

          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            className="mb-4 flex items-center gap-2 text-blue-600 hover:underline"
          >
            ← Back
          </button>

          <Card>
            <CardHeader>
              <CardTitle>Edit Event</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

              <EventInputsGrid form={form} onChange={handleChange} />

              <div>
                <label>Description</label>
                <textarea
                  name="event_desc"
                  rows={3}
                  className="border p-2 w-full rounded"
                  value={form?.event_desc || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Objective</label>
                <textarea
                  name="objective"
                  rows={2}
                  className="border p-2 w-full rounded"
                  value={form?.objective || ""}
                  onChange={handleChange}
                />
              </div>

              <TitleImageInput
                titleImageUrl={titleImageUrl}
                setTitleImg={setTitleImg}
              />

              <MultipleImages
                allImages={allImages}
                setImages={setImages}
                setRemovedImages={setRemovedImages}
                setForm={setForm}
                form={form}
                openModal={openModal}
              />

              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>

            </CardContent>
          </Card>
        </div>
      </div>

      <EventImageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        imageSrc={modalImageSrc}
      />
    </ProtectedRoute>
  );
}
