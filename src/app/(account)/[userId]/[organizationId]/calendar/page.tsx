import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./calendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Calendar() {
   return (
      <AccountPageLayout>
         <section className={styles.calendar_wrapper}>
            <section className={styles.calendar_section}>
               <div className={styles.top_area}>
                  <h1>January <span>2024</span></h1>
                  <div className={styles.month_slider}>
                     <button className={styles.previous_month}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                     </button>
                     <button className={styles.next_month}>
                        <FontAwesomeIcon icon={faChevronRight} />
                     </button>
                  </div>
                  <button className={styles.add_event}>
                     <Link href="/calendar/new-event">
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
                  {/* ONLY USE FIRST DAY AS TEMPLATE BECAUSE IT HAS THE ACTUAL ANCHOR TAG ADDED TO I */}
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <a href="#details"><p className={styles.view_more}>View Details</p></a>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
                  <div className={styles.day}>
                     <p className={styles.day_number}>1</p>
                     <div className={styles.calendar_events}>
                        <p>Scheduled Meeting</p>
                        <p>Zoom Call</p>
                        <p className={styles.view_more}>View Details</p>
                     </div>
                  </div>
               </div>
            </section>
            <section className={styles.selected_day_details}>
               <h1 id="details">January 20th</h1>
               <div className={styles.day_events}>
                  <div className={styles.event}>
                     <h2>Scheduled Meeting</h2>
                     <p>Time: 4:00 PM</p>
                     <div className={styles.relevant_roles}>
                        <h3>Relevant Roles</h3>
                        <p>Web Developer</p>
                        <p>Information Architect</p>
                        <p>Backend Developer</p>
                     </div>
                     <details>
                        <summary>Details</summary>
                        <p>Enter Zoom Meeting Via This Link</p>
                     </details>
                  </div>
                  <div className={styles.event}>
                     <h2>Scheduled Meeting</h2>
                     <p>Time: 4:00 PM</p>
                     <div className={styles.relevant_roles}>
                        <h3>Relevant Roles</h3>
                        <p>Web Developer</p>
                        <p>Information Architect</p>
                        <p>Backend Developer</p>
                     </div>
                     <details>
                        <summary>Details</summary>
                        <p>Enter Zoom Meeting Via This Link</p>
                     </details>
                  </div>
                  <div className={styles.event}>
                     <h2>Scheduled Meeting</h2>
                     <p>Time: 4:00 PM</p>
                     <div className={styles.relevant_roles}>
                        <h3>Relevant Roles</h3>
                        <p>Web Developer</p>
                        <p>Information Architect</p>
                        <p>Backend Developer</p>
                     </div>
                     <details>
                        <summary>Details</summary>
                        <p>Enter Zoom Meeting Via This Link</p>
                     </details>
                  </div>
                  <div className={styles.event}>
                     <h2>Scheduled Meeting</h2>
                     <p>Time: 4:00 PM</p>
                     <div className={styles.relevant_roles}>
                        <h3>Relevant Roles</h3>
                        <p>Web Developer</p>
                        <p>Information Architect</p>
                        <p>Backend Developer</p>
                     </div>
                     <details>
                        <summary>Details</summary>
                        <p>Enter Zoom Meeting Via This Link</p>
                     </details>
                  </div>
               </div>
            </section>
         </section>
      </AccountPageLayout>
   )
}