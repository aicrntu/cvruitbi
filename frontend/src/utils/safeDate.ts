export type SafeDate = {
  day: string;
  monthYear: string;
};

export function getSafeDate(date?: string | null): SafeDate {
  if (!date) {
    return { day: "—", monthYear: "" };
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return { day: "—", monthYear: "" };
  }

  return {
    day: String(d.getDate()),
    monthYear: d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  };
}
