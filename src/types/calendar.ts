export type CalendarEvent = {
  eventName: string;
  eventDate: string;
  eventTime: string;
  relevantRoles: string[];
  content: string;
};

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
  events: CalendarEvent[];
};

export type CalendarMonth = {
  year: number;
  month: number;
  label: string;
  days: CalendarDate[];
};
