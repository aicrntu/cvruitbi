"use client";

import * as XLSX from "xlsx";
import { ApplyFormItem } from "@/services/applyForm.service";
import { FileText } from "lucide-react";

export default function ExportExcelButton({ data }: { data: ApplyFormItem[] }) {
  const downloadExcel = () => {
    const formatted = data.map((item) => ({
      Startup: item.startupName,
      Founder: item.founderName,
      Email: item.email,
      Contact: item.contact,
      Stage: item.stage,
      Category: item.category,
      Sectors: item.sectors.join(", "),
      City: item.city,
      Referral: item.referral,
      Website: item.website,
      AppliedOn: new Date(item.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");

    XLSX.writeFile(wb, "startup_applications.xlsx");
  };

  return (
    <button
      onClick={downloadExcel}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-700 transition"
    >
      <FileText size={16} />
      Export Excel
    </button>
  );
}
