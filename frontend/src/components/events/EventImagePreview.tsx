"use client";

import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import React from "react";

interface EventImagePreviewProps {
  url: string;
  isNew?: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

const EventImagePreview: React.FC<EventImagePreviewProps> = ({
  url,
  isNew = false,
  onClick,
  onRemove,
}) => {
  return (
    <div
      className="relative w-20 h-20 border rounded overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <img src={url} alt="event image" className="w-full h-full object-cover" />

      {/* show cross button ALWAYS if onRemove exists */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default EventImagePreview;
