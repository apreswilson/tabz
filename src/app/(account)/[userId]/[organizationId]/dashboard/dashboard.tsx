import { CalendarEvent } from "@/types/calendar";
import styles from "./dashboard.module.scss";
import { Shout } from "@/types/shout";
import { Task } from "@/types/task";

type DashboardProps = {
  upcomingEvents: CalendarEvent[];
  recentShouts: Shout[];
  incompleteTasks: Task[];
  completeTasks: Task[];
};

export default async function Dashboard({
  upcomingEvents,
  recentShouts,
  incompleteTasks,
  completeTasks,
}: Readonly<DashboardProps>) {
  console.log(incompleteTasks);
  return (
    <section>
      <section className={styles.top_section}>
        <div className={styles.tasks_completed}>
          <h1>Complete Tasks</h1>
          <h2>{completeTasks.length}</h2>
        </div>
        <div className={styles.tasks_incomplete}>
          <h1>Incomplete Tasks</h1>
          <h2>{incompleteTasks.length}</h2>
        </div>
        <div className={styles.upcoming_event_quantity}>
          <h1>Upcoming Events</h1>
          <h2>{upcomingEvents.length}</h2>
        </div>
      </section>
      <section className={styles.bottom_section}>
        <div className={styles.shouts}>
          <h1>Shouts</h1>
          {recentShouts.slice(0, 3).map((shout, index) => (
            <div key={index} className={styles.shout}>
              <h2>{shout.title}</h2>
              <p>
                Relevant Roles:
                {shout.relevantRoles.map((role, idx) => (
                  <span key={idx}>{role.toString()}</span>
                ))}
              </p>
              <p className={styles.time_posted}>
                {new Date(shout.timePosted).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.tasks}>
          <h1>Incomplete Tasks</h1>
          <div className={styles.tasks_list}>
            {incompleteTasks.slice(0, 3).map((task, index) => (
              <div className={styles.task} key={index}>
                <h2>{task.taskName}</h2>
                <p>Deadline: {task.deadline}</p>
                <p>Status: {task.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.events}>
          <h1>Upcoming Events</h1>
          <div className={styles.events_list}>
            {upcomingEvents.slice(0, 3).map((event) => (
              <div className={styles.event} key={event._id}>
                <h2>{event.eventName}</h2>
                <p>Date: {event.eventDate}</p>
                <p>Time: {event.eventTime}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.guide_recom}>
          <h1>Need Help?</h1>
          <p>
            Please refer to the guide page for step by step instructions on how perform any task through the website
            that may be necessary in order for users to complete tasks within their respective organization.
          </p>
        </div>
        <div className={styles.settings_recom}>
          <h1>Select Preferences</h1>
          <p>
            If you wish to customize settings specifically to do with the organization, please refer to the settings
            page. There are several options you can customize there such as color theme, toggle popups, and configure
            your organizations roles if you are an admin.
          </p>
        </div>
      </section>
    </section>
  );
}
