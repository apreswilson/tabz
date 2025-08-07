export type CalendarEvent = {
  eventName: string;
  eventDate: string;
  eventTime: string;
  relevantRoles: string[];
  content: string;
  _id?: string;
};

export type CalendarDate = {
  year: number;
  month: number; // 1-based
  day: number;
  events: CalendarEvent[];
  match: string; // e.g. ""
};

export type CalendarMonth = {
  year: number;
  month: number; // 0-based
  label: string;
  days: CalendarDate[];
};
