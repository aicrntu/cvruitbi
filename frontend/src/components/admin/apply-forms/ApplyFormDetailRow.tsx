import { ApplyFormItem } from "@/services/applyForm.service";

interface ApplyFormDetailRowProps {
  item: ApplyFormItem;
  colSpan: number;
}

export function ApplyFormDetailRow({ item, colSpan }: ApplyFormDetailRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-0 border-b border-gray-200">
        <div className="bg-blue-50 p-4 md:p-6 shadow-inner text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Contact Info */}
            <div className="space-y-1">
              <p className="font-bold text-gray-700">Contact Details</p>
              <p><span className="font-medium">Phone:</span> {item.contact}</p>
              <p><span className="font-medium">City:</span> {item.city}</p>
              <p>
                <span className="font-medium">Website:</span>{" "}
                {item.website ? (
                  <a
                    href={
                      item.website.startsWith("http")
                        ? item.website
                        : `https://${item.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {item.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            {/* Application Details */}
            <div className="space-y-1">
              <p className="font-bold text-gray-700">Application Context</p>
              <p><span className="font-medium">Referral:</span> {item.referral || "None"}</p>
              <p><span className="font-medium">Date:</span> {new Date(item.createdAt).toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {new Date(item.createdAt).toLocaleTimeString()}</p>
            </div>

            {/* Description */}
            <div>
              <p className="font-bold text-gray-700">Description</p>
              <p className="whitespace-pre-wrap">{item.description || "No description provided."}</p>
            </div>

          </div>
        </div>
      </td>
    </tr>
  );
}
