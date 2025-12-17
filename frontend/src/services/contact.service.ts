import api from "@/lib/axios";

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: ContactItem[];
}

export async function fetchAllContacts(): Promise<ContactResponse> {
  const res = await api.get<ContactResponse>("/contact");
  return res.data;
}
