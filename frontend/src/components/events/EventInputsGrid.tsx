"use client";

import React, { ChangeEvent } from "react";
import Input from "@/components/ui/Input";

interface Props {
  form: any;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function EventInputsGrid({ form, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* <Input name="event_code" value={form?.event_code || ""} onChange={onChange} placeholder="Code" /> */}

      <Input name="event_name" value={form?.event_name || ""} onChange={onChange} placeholder="Event Name" />

      <Input type="date" name="event_date" value={form?.event_date || ""} onChange={onChange} placeholder="Event Date" />

      <Input name="venue" value={form?.venue || ""} onChange={onChange} placeholder="Venue" />

      <Input name="key_speaker" value={form?.key_speaker || ""} onChange={onChange} placeholder="Key Speaker" />

      <Input name="targeted_audience" value={form?.targeted_audience || ""} onChange={onChange} placeholder="Audience" />

      <Input name="organizer" value={form?.organizer || ""} onChange={onChange} placeholder="Organizer" />

    </div>
  );
}
