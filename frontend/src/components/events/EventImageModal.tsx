"use client";

import { X } from "lucide-react";

export default function EventImageModal({
  isOpen,
  onClose,
  imageSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 bg-white p-1 rounded shadow"
        >
          <X className="w-4 h-4" />
        </button>

        <img
          src={imageSrc}
          alt="Modal Image"
          className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
