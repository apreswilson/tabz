import { CalendarDate, CalendarEvent, CalendarMonth } from '@/types/calendar';

const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getDaysInMonth = (year: number, month: number): number => {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const generateCalendarMonth = (
  year: number,
  month: number,
): CalendarMonth => {
  const daysInMonth = getDaysInMonth(year, month);
  const days: CalendarDate[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      year,
      month,
      day,
      events: [],
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
  const baseMonth = centerDate.getMonth();

  for (let offset = -12; offset <= 12; offset++) {
    const date = new Date(baseYear, baseMonth + offset);
    const year = date.getFullYear();
    const month = date.getMonth();
    months.push(generateCalendarMonth(year, month));
  }

  return months;
};

export const addEventToCalendar = (
  calendar: CalendarMonth[],
  event: CalendarEvent,
): void => {
  const [year, month, day] = event.eventDate.split('-').map(Number);
  const targetMonth = calendar.find(
    (m) => m.year === year && m.month === month - 1,
  );
  const targetDay = targetMonth?.days.find((d) => d.day === day);

  if (targetDay) {
    targetDay.events.push(event);
  }
};
