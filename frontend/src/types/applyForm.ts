// types/applyForm.ts
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
  website?: string;
  description?: string;
  referral?: string;
  fileUrl?: string;
  createdAt: string; // ISO date
}

export interface ApplyFormResponse {
  success: boolean;
  message: string;
  data: ApplyFormItem[];
}
