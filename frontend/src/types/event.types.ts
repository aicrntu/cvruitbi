export interface EventData {
  event_code: string;
  event_name: string;
  event_desc: string;
  objective: string;
  event_date: string;
  venue: string;
  key_speaker: string;
  targeted_audience: string;
  organizer: string;
  isPress: string | number;
  _id?: string;
  title_img?: string;
  images?: string[];
}
