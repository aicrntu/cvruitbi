"use client";

import { Image as ImageIcon } from "lucide-react";
import Input from "@/components/ui/Input";
import EventImagePreview from "@/components/events/EventImagePreview";

interface Props {
  allImages: any[];
  setImages: any;
  setRemovedImages: any;
  setForm: any;
  form: any;
  openModal: (url: string) => void;
}

export default function MultipleImages({
  allImages,
  setImages,
  setRemovedImages,
  setForm,
  form,
  openModal,
}: Props) {
  return (
    <div>
      <label className="font-medium flex items-center gap-2">
        <ImageIcon size={16} />
        Add More Images
      </label>

      <Input
        type="file"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files || []))}
      />

      <div className="flex gap-2 mt-2 flex-wrap">
        {allImages.map((img, i) => (
          <EventImagePreview
            key={i}
            url={img.url}
            isNew={img.isNew}
            onClick={() => openModal(img.url)}
            onRemove={() => {
              if (img.isNew) {
                setImages((prev: File[]) =>
                  prev.filter((_, idx) => idx !== img.originalIndex)
                );
              } else {
                const removed = form?.images?.[img.originalIndex];
                if (removed) {
                  setRemovedImages((prev: string[]) => [...prev, removed]);
                }

                setForm((prev: any) => ({
                  ...prev,
                  images: prev?.images?.filter(
                    (_: any, idx: number) => idx !== img.originalIndex
                  ),
                }));
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
