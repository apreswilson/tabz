import { CalendarDate, CalendarEvent, CalendarMonth } from "@/types/calendar";

const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (year: number, month: number): number => {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateCalendarMonth = (year: number, month: number): CalendarMonth => {
  const daysInMonth = getDaysInMonth(year, month);
  const days: CalendarDate[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const match = `${String(month + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`;

    days.push({
      year,
      month,
      day,
      events: [],
      match,
    });
  }

  return {
    year,
    month,
    label: monthNames[month],
    days,
  };
};

export const generateCalendarRange = (centerDate: Date): CalendarMonth[] => {
  const months: CalendarMonth[] = [];

  const baseYear = centerDate.getFullYear();
  const baseMonth0 = centerDate.getMonth(); // 0-based

  for (let offset = -12; offset <= 12; offset++) {
    const date = new Date(baseYear, baseMonth0 + offset);
    const year = date.getFullYear();
    const month0 = date.getMonth(); // still 0-based

    months.push({
      ...generateCalendarMonth(year, month0),
      month: month0 + 1, // Convert to 1-based here
      days: generateCalendarMonth(year, month0).days.map((d) => ({
        ...d,
        month: d.month + 1, // Convert days too
      })),
    });
  }

  return months;
};

export const addEventToCalendar = (calendar: CalendarMonth[], event: CalendarEvent): CalendarMonth[] => {
  // Skip invalid dates
  if (!event.eventDate) return calendar;

  return calendar.map((month) => {
    // Only update months containing this event
    if (!month.days.some((d) => d.match === event.eventDate)) return month;

    return {
      ...month,
      days: month.days.map((day) => {
        if (day.match !== event.eventDate) return day;

        return {
          ...day,
          events: [...day.events, event], // append immutably
        };
      }),
    };
  });
};
