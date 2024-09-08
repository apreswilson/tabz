/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import styles from "./page.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBookOpen,
  faBullhorn,
  faCalendar,
  faGear,
  faListCheck,
  faUsers
} from "@fortawesome/free-solid-svg-icons"
import { faInstagram, faLinkedin, faTwitter, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"

export default function Home() {

  return (
    <main className={styles.home_page}>
      <nav className={styles.navbar}>
        <h1>Tabz</h1>
        <ul className={styles.nav_links}>
          <li><Link href="/login">Sign In</Link></li>
          <li><Link href="/signup">Get Started</Link></li>
        </ul>
      </nav>
      <section className={styles.main_area}>
        <h1>Welcome to<br /><span>Tabz</span></h1>
        <h2>
          Tabz is a simplistic management system built for smaller to medium
          companies
        </h2>
        <div className={styles.capabilities}>
          <h1>Simpler Management</h1>
          <h2>
            Tabz offers multiple forms of managing your business in order to aid in
            maintaining a strong workflow
          </h2>
          <div className={styles.list}>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faBullhorn} />
                <h3>Shouts</h3>
              </div>
              <p>
                Make important announcements to all employees or specific job roles by utilizing
                the Shouts page
              </p>
            </div>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faUsers} />
                <h3>Members</h3>
              </div>
              <p>
                Search for specific members within the organization and perform actions based on
                permissions using the Members page
              </p>
            </div>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faListCheck} />
                <h3>Tasks</h3>
              </div>
              <p>
                Create and manage tasks status for specific or multiple roles by utilizing the
                Tasks page
              </p>
            </div>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faCalendar} />
                <h3>Calendar</h3>
              </div>
              <p>
                Create and view upcoming events with important details by utilizing the Calendar
                page
              </p>
            </div>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faBookOpen} />
                <h3>Guide</h3>
              </div>
              <p>
                Unsure of how to configure your organization? There are specific instructions
                listed on the Guide page
              </p>
            </div>
            <div className={styles.list_item}>
              <div className={styles.top}>
                <FontAwesomeIcon icon={faGear} />
                <h3>Configure</h3>
              </div>
              <p>
                Easily configure your organizations roles and permissions by utilizing the
                Settings Page
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer_area}>
        <p>&copy; Tabz 2024</p>
        <p>Questions? <Link href="mailto:apreswilson@gmail.com">Contact us</Link></p>
        <div className={styles.socials}>
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faYoutube} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </footer>
    </main>
  )
}