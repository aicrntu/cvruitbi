"use client";

import Input from "@/components/ui/Input";
import { Image as ImageIcon } from "lucide-react";

interface Props {
  titleImageUrl: string;
  setTitleImg: (file: File | null) => void;
}

export default function TitleImageInput({ titleImageUrl, setTitleImg }: Props) {
  return (
    <div className="space-y-4">
      <label className="font-medium flex items-center gap-2">
        <ImageIcon size={16} />
        Title Image
      </label>

      <Input type="file" onChange={(e) => setTitleImg(e.target.files?.[0] || null)} />

      {titleImageUrl && (
        <img
          src={titleImageUrl}
          className="w-20 h-20 object-cover rounded cursor-pointer border"
        />
      )}
    </div>
  );
}
