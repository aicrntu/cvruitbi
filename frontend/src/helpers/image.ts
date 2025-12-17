export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5000";

export const getImageUrl = (file: File | string | undefined): string => {
  if (!file) return "";

  if (typeof file === "string") {

    const cleanFile = file.replace(/\\/g, "/").split("/").pop();

    return encodeURI(`${IMAGE_BASE_URL}/uploads/${cleanFile}`);
  }

  return URL.createObjectURL(file);
};
