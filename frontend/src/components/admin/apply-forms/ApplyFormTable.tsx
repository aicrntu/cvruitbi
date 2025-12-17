"use client";

import { Fragment } from "react";
import { ApplyFormItem } from "@/services/applyForm.service";
import { ApplyFormDetailRow } from "./ApplyFormDetailRow";
import { Minus, Plus, FileText } from "lucide-react";

export default function ApplyFormTable({
  forms,
  expandedRowId,
  setExpandedRowId
}: {
  forms: ApplyFormItem[];
  expandedRowId: string | null;
  setExpandedRowId: (id: string | null) => void;
}) {
  const toggle = (id: string) =>
    setExpandedRowId(expandedRowId === id ? null : id);

  return (
    <table className="min-w-full text-sm divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Details</th>
          <th className="px-4 py-2">Startup</th>
          <th className="px-4 py-2">Founder</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Stage</th>
          <th className="px-4 py-2">Category/Sectors</th>
          <th className="px-4 py-2">File</th>
          <th className="px-4 py-2">Applied</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {forms.map((item, index) => (
          <Fragment key={item._id}>
            <tr
              className={`cursor-pointer hover:bg-blue-50 ${
                index % 2 ? "bg-gray-50" : "bg-white"
              }`}
              onClick={() => toggle(item._id)}
            >
              <td className="px-3 py-2 text-center">
                {expandedRowId === item._id ? (
                  <Minus className="w-4 h-4 text-blue-600" />
                ) : (
                  <Plus className="w-4 h-4 text-blue-600" />
                )}
              </td>

              <td className="px-3 py-2 font-semibold">{item.startupName}</td>
              <td className="px-3 py-2">{item.founderName}</td>
              <td className="px-3 py-2 text-blue-600">{item.email}</td>
              <td className="px-3 py-2 text-purple-600">{item.stage}</td>

              <td className="px-3 py-2">
                <div>{item.category}</div>
                <div className="text-gray-400 text-xs truncate">
                  {item.sectors.join(", ")}
                </div>
              </td>

              <td className="px-3 py-2 text-center">
                {item.fileUrl ? (
                  <a
                    href={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.fileUrl.replace(
                      "uploads/",
                      ""
                    )}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FileText className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>

              <td className="px-3 py-2 text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
            </tr>

            {expandedRowId === item._id && (
              <ApplyFormDetailRow item={item} colSpan={8} />
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
