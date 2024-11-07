import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./dashboard.module.scss";

export default function Dashboard() {
   return (
      <AccountPageLayout>
         <section>
            <section className={styles.top_section}>
               <div className={styles.tasks_completed}>
                  <h1>Complete Tasks</h1>
                  <h2>5</h2>
               </div>
               <div className={styles.tasks_incomplete}>
                  <h1>Incomplete Tasks</h1>
                  <h2>10</h2>
               </div>
               <div className={styles.upcoming_event_quantity}>
                  <h1>Upcoming Events</h1>
                  <h2>4</h2>
               </div>
            </section>
            <section className={styles.bottom_section}>
               <div className={styles.shouts}>
                  <h1>Shouts</h1>
                  <div className={styles.shouts_list}>
                     <div className={styles.shout}>
                        <h2>Shout Title</h2>
                        <p>Relevant Roles:
                           <span>Web Developer</span>&nbsp;
                           <span>Information Architect</span>
                        </p>
                        <p className={styles.time_posted}>10:38 AM Sunday, August 18, 2024</p>
                     </div>
                     <div className={styles.shout}>
                        <h2>Shout Title</h2>
                        <p>Relevant Roles:
                           <span>Web Developer</span>&nbsp;
                           <span>Information Architect</span>
                        </p>
                        <p className={styles.time_posted}>10:38 AM Sunday, August 18, 2024</p>
                     </div>
                     <div className={styles.shout}>
                        <h2>Shout Title</h2>
                        <p>Relevant Roles:
                           <span>Web Developer</span>&nbsp;
                           <span>Information Architect</span>
                        </p>
                        <p className={styles.time_posted}>10:38 AM Sunday, August 18, 2024</p>
                     </div>
                  </div>
               </div>
               <div className={styles.tasks}>
                  <h1>Incomplete Tasks</h1>
                  <div className={styles.tasks_list}>
                     <div className={styles.task}>
                        <h2>Task Name</h2>
                        <p>Deadline: 4 PM 08/25</p>
                        <p>Status: Not Started</p>
                     </div>
                     <div className={styles.task}>
                        <h2>Task Name</h2>
                        <p>Deadline: 4 PM 08/25</p>
                        <p>Status: Not Started</p>
                     </div>
                     <div className={styles.task}>
                        <h2>Task Name</h2>
                        <p>Deadline: 4 PM 08/25</p>
                        <p>Status: Not Started</p>
                     </div>
                  </div>
               </div>
               <div className={styles.events}>
                  <h1>Upcoming Events | January 20th</h1>
                  <div className={styles.events_list}>
                     <div className={styles.event}>
                        <h2>Scheduled Meeting</h2>
                        <p>Time: 4:00 PM</p>
                     </div>
                     <div className={styles.event}>
                        <h2>Scheduled Meeting</h2>
                        <p>Time: 4:00 PM</p>
                     </div>
                     <div className={styles.event}>
                        <h2>Scheduled Meeting</h2>
                        <p>Time: 4:00 PM</p>
                     </div>
                     <div className={styles.event}>
                        <h2>Scheduled Meeting</h2>
                        <p>Time: 4:00 PM</p>
                     </div>
                  </div>
               </div>
               <div className={styles.guide_recom}>
                  <h1>Need Help?</h1>
                  <p>
                     Please refer to the guide page for step by step instructions on how perform
                     any task through the website that may be necessary in order for users to
                     complete tasks within their respective organization.
                  </p>
               </div>
               <div className={styles.settings_recom}>
                  <h1>Select Preferences</h1>
                  <p>
                     If you wish to customize settings specifically to do with the organization,
                     please refer to the settings page. There are several options you can customize
                     there such as color theme, toggle popups, and configure your organizations roles
                     if you are an admin.
                  </p>
               </div>
            </section>
         </section>
      </AccountPageLayout>
   )
}