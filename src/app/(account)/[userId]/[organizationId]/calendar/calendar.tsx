"use client";
import { faCalendarPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./calendar.module.scss";
import Link from "next/link";
import { addEventToCalendar, generateCalendarRange } from "@/utils/calendar";
import { useMemo, useState } from "react";
import { CalendarDate, CalendarEvent, CalendarMonth } from "@/types/calendar";

type CalendarSectionProps = {
  userId: string;
  organizationId: string;
  organizationEvents: CalendarEvent[];
};

export default function CalendarSection({
  userId,
  organizationId,
  organizationEvents,
}: Readonly<CalendarSectionProps>) {
  const todayDate = useMemo(() => new Date(), []);

  console.log(organizationEvents);

  // Generate calendar + merge in organization events (only recompute when deps change)
  const calendar: CalendarMonth[] = useMemo(() => {
    const baseCalendar = generateCalendarRange(todayDate);

    // addEventToCalendar now returns new calendar immutably; update calendar on each event
    return organizationEvents.reduce((cal, event) => addEventToCalendar(cal, event), baseCalendar);
  }, [organizationEvents, todayDate]);

  console.log(calendar);

  // Find initial month index (month is 1-based now)
  const initialIndex = calendar.findIndex(
    (m) => m.year === todayDate.getFullYear() && m.month === todayDate.getMonth() + 1
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(initialIndex);
  const currentMonthSelected = calendar[currentMonthIndex];

  // Navigation
  const viewOneMonthAhead = () => {
    if (currentMonthIndex < calendar.length - 1) {
      setCurrentMonthIndex((prev) => prev + 1);
      setCurrentDaySelected(undefined);
    }
  };

  const viewOneMonthBehind = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
      setCurrentDaySelected(undefined);
    }
  };

  // Days
  const todayDayObject = currentMonthSelected.days.find(
    (d) => d.year === todayDate.getFullYear() && d.month === todayDate.getMonth() + 1 && d.day === todayDate.getDate()
  );
  const [currentDaySelected, setCurrentDaySelected] = useState<CalendarDate | undefined>(todayDayObject);

  const selectDay = (day: CalendarDate) => {
    setCurrentDaySelected(day);
  };

  // Offset for rendering start of month
  // Convert month back to 0-based for Date constructor
  const firstDayOfWeek = new Date(calendar[currentMonthIndex].year, calendar[currentMonthIndex].month - 1, 1).getDay();

  const offset = (firstDayOfWeek + 6) % 7;

  return (
    <section className={styles.calendar_wrapper}>
      <section className={styles.calendar_section}>
        <div className={styles.top_area}>
          <h1>
            {currentMonthSelected.label}&nbsp;
            <span>{currentMonthSelected.year}</span>
          </h1>
          <div className={styles.month_slider}>
            <button className={styles.previous_month} onClick={viewOneMonthBehind}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button className={styles.next_month} onClick={viewOneMonthAhead}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <button className={styles.add_event}>
            <Link href={`/${userId}/${organizationId}/calendar/new-event`}>
              <FontAwesomeIcon icon={faCalendarPlus} />
              <p>Add Event</p>
            </Link>
          </button>
        </div>
        <div className={styles.calendar}>
          <div className={styles.top_row}>
            <p>MON</p>
            <p>TUE</p>
            <p>WED</p>
            <p>THU</p>
            <p>FRI</p>
            <p>SAT</p>
            <p>SUN</p>
          </div>

          {/* Generate empty days to align days to corresponding day of week */}
          {Array.from({ length: offset }).map((_, i) => (
            <div key={"offset-" + i} className={styles.day} />
          ))}

          {calendar[currentMonthIndex].days.map((day) => {
            const isSelectedDay = day.day === currentDaySelected?.day;

            return (
              <div
                className={`${styles.day} ${isSelectedDay ? styles.today : ""}`}
                key={`${day.year}-${day.month}-${day.day}`}
              >
                <p className={styles.day_number}>{day.day}</p>
                <div className={styles.calendar_events}>
                  {day.events.slice(0, 2).map((event, index) => (
                    <p key={index}>{event.eventName}</p>
                  ))}
                  <button className={styles.view_more} onClick={() => selectDay(day)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className={styles.selected_day_details}>
        <h1>
          {currentMonthSelected.label} {currentDaySelected?.day}
        </h1>
        <div className={styles.day_events}>
          {currentDaySelected?.events.length === 0 && <p>No events on this day</p>}
          {currentDaySelected?.events.map((event, index) => (
            <div className={styles.event} key={index}>
              <h2>{event.eventName}</h2>
              <p>Time: {event.eventTime}</p>
              <div className={styles.relevant_roles}>
                <h3>Relevant Roles</h3>
                {event.relevantRoles.map((role) => (
                  <p key={role}>{role}</p>
                ))}
              </div>
              <details>
                <summary>Details</summary>
                <p>{event.content}</p>
              </details>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
