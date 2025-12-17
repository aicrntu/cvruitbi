import api from "@/lib/axios";

export interface ApplyFormItem {
  _id: string;
  founderName: string;
  startupName: string;
  email: string;
  contact: string;
  city: string;
  stage: string;
  category: string;
  sectors: string[];
  website: string;
  description: string;
  referral: string;
  fileUrl?: string;
  createdAt: string;
}

export interface ApplyFormResponse {
  success: boolean;
  message: string;
  data: ApplyFormItem[];
}

export async function fetchAllApplyForms(stage?: string, year?: string): Promise<ApplyFormResponse> {
  const params: any = {};

  if (stage) params.stage = stage;
  if (year) params.year = year;

  const res = await api.get<ApplyFormResponse>("/apply-form", { params });
  return res.data;
}
