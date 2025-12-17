import api from "@/lib/axios";

export interface EventResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function createEvent(formData: FormData) {
  const res = await api.post<EventResponse>("/events/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getAllEvents(params?: any) {
  const res = await api.get<EventResponse>("/events", { params });
  return res.data;
}

export async function getEventById(id: string) {
  const res = await api.get<EventResponse>(`/events/${id}`);
  return res.data;
}

export async function updateEvent(id: string, formData: FormData) {
  const res = await api.put<EventResponse>(
    `/events/update/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
}
