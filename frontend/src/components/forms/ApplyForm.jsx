"use client";

import { useState } from "react";
import { submitApplyForm } from "../../api/apply.api.js";

export default function ApplyForm() {
  const [form, setForm] = useState({
    founderName: "",
    startupName: "",
    email: "",
    contact: "",
    city: "",
    stage: "",
    category: "",
    sectors: [],
    website: "",
    description: "",
    referral: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const sectorsList = [
    "Agriculture", "Blockchain", "FinTech", "Media", "Technology",
    "AR/VR/MR/XR", "Software", "Consumer", "FMCG", "Robotics",
    "Tools Education", "AI/ML", "Developer", "Other", "Hardware",
    "SAAS", "Transportation", "B2B", "Drones", "Healthcare",
  ];

  const toggleSector = (sector) => {
    setForm((prev) => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter((s) => s !== sector)
        : [...prev.sectors, sector],
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === "file" ? files[0] : value });
  };

  /* -------------------------------------------
        STRONG FORM VALIDATION FUNCTION
  ------------------------------------------- */
  const validateForm = () => {
    if (!form.founderName.trim()) return "Founder name is required";
    if (!form.startupName.trim()) return "Startup name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format";

    if (!form.contact.trim()) return "Contact is required";
    if (form.contact.length < 10) return "Contact must be 10 digits";

    if (!form.city.trim()) return "City is required";
    if (!form.stage) return "Stage is required";
    if (!form.category) return "Category is required";
    if (form.sectors.length === 0) return "Select at least one sector";
    if (!form.description.trim()) return "Description is required";
    if (!form.referral.trim()) return "Referral is required";

    if (!form.file) return "Please upload presentation (.pdf/.ppt/.pptx)";

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
    ];

    if (!allowedTypes.includes(form.file.type))
      return "Invalid file type. Only PDF, PPT, PPTX allowed";

    if (form.file.size > 5 * 1024 * 1024)
      return "File size must be less than 5MB";

    return null;
  };

  /* -------------------------------------------
                SUBMIT HANDLER
  ------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await submitApplyForm(form);

      if (!response) throw new Error("No response from server");

      if (response.success === false) {
        throw new Error(response.message || "Something went wrong");
      }

      setSuccessMsg("Your application has been submitted successfully!");

      setForm({
        founderName: "",
        startupName: "",
        email: "",
        contact: "",
        city: "",
        stage: "",
        category: "",
        sectors: [],
        website: "",
        description: "",
        referral: "",
        file: null,
      });

    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else if (error.message.includes("Network")) {
        setErrorMsg("Network error! Please check your internet connection.");
      } else {
        setErrorMsg(error.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-[#e8f7fa] p-4 md:p-5 text-[10px]">

      {/* Heading */}
      <h2 className="text-lg md:text-xl font-bold text-[#0b1220] mb-3">
        Apply <span className="text-[#00d2ef]">Form</span>
      </h2>

      {errorMsg && (
        <p className="text-red-600 text-xs mb-2 font-semibold">{errorMsg}</p>
      )}
      {successMsg && (
        <p className="text-green-600 text-xs mb-2 font-semibold">{successMsg}</p>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

        <FormInput label="Founder Name *" name="founderName" value={form.founderName} placeholder="Founder Name" onChange={handleChange} />

        <FormInput label="Startup Name *" name="startupName" value={form.startupName} placeholder="Startup Name" onChange={handleChange} />

        <FormInput label="Email *" name="email" type="email" value={form.email} placeholder="email@example.com" onChange={handleChange} />

        <FormInput label="Contact *" name="contact" value={form.contact} placeholder="9999999999" onChange={handleChange} />

        <FormInput label="City *" name="city" value={form.city} placeholder="City" onChange={handleChange} />

        <SelectBox label="Stage *" name="stage" value={form.stage} options={["Ideation","Prototype","Early Stage","Growth Stage","Established"]} onChange={handleChange} />

        <SelectBox label="Category *" name="category" value={form.category} options={["SC","ST","OBC","GENERAL"]} onChange={handleChange} />

        {/* SECTORS */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Sectors *</label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
            {sectorsList.map((sector) => (
              <label
                key={sector}
                className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[9px] cursor-pointer 
                ${
                  form.sectors.includes(sector)
                    ? "border-[#00d2ef] bg-[#e6fbff]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.sectors.includes(sector)}
                  onChange={() => toggleSector(sector)}
                  className="accent-[#00d2ef] w-3 h-3"
                />
                {sector}
              </label>
            ))}
          </div>
        </div>

        <FormInput label="Website" name="website" value={form.website} placeholder="http://startup.com" onChange={handleChange} full />

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Description *</label>
          <textarea
            name="description"
            rows={2}
            placeholder="About your startup..."
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Upload Presentation ( Max 5MB ) *</label>
          <input
            type="file"
            name="file"
            accept=".ppt,.pptx,.pdf"
            onChange={handleChange}
            className="mt-1 bg-white px-2 py-1 border rounded-md text-[9px] 
            file:bg-[#00d2ef] file:text-white file:px-2 file:py-1 file:rounded-md"
          />
        </div>

        <FormInput
          label="Referral *"
          name="referral"
          value={form.referral}
          placeholder="Facebook, Instagram"
          onChange={handleChange}
          full
        />

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-[10px] rounded-md font-bold text-white 
              ${loading ? "bg-gray-400" : "bg-[#00d2ef] hover:bg-[#00b5d6]"}`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Reusable INPUT COMPONENTS ---------------- */

function FormInput({ label, name, value, onChange, placeholder, type="text", full }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="font-semibold text-gray-800 text-[10px]">{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
      />
    </div>
  );
}

function SelectBox({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="font-semibold text-gray-800 text-[10px]">{label}</label>
      <select
        name={name}
        value={value}
        required
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
      >
        <option value="">--Select--</option>
        {options.map((op) => <option key={op}>{op}</option>)}
      </select>
    </div>
  );
}
