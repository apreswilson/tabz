"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faChevronLeft,
   faChevronRight,
   faRectangleList,
   faUsers,
   faListCheck,
   faBullhorn,
   faCalendar,
   faBookOpen,
   faGear,
   faUser,
   faCircleLeft,
   faArrowLeft,
   faDoorOpen,
   faHouse
} from "@fortawesome/free-solid-svg-icons";
import styles from "./navigation-menu.module.scss";
import Link from "next/link";
interface ExpandMenuProps {
   isMenuExpanded: boolean;
   toggleMenuView: () => void;
}

export default function NavigationMenu({
   isMenuExpanded, toggleMenuView
}: ExpandMenuProps) {


   return (
      <nav className={
         isMenuExpanded ?
            styles.navigation_menu
            :
            styles.minimized_navigation_menu
      }>
         {!isMenuExpanded ?
            <div className={styles.open_mobile_menu} onClick={toggleMenuView}>
               <FontAwesomeIcon icon={faChevronRight} />
            </div>
            :
            <></>
         }
         <section className={styles.top_area}>
            <h1>{isMenuExpanded ? "Tabz" : "T"}</h1>
            <FontAwesomeIcon
               icon={isMenuExpanded ? faChevronLeft : faChevronRight}
               onClick={toggleMenuView} />
         </section>
         <div className={styles.bar}></div>
         <section className={styles.pages}>
            <ul>
               <li>
                  <Link href="/dashboard">
                     <FontAwesomeIcon icon={faRectangleList} />
                     {isMenuExpanded ? <p>Dashboard</p> : <></>}
                     <span className={styles.tool_tip}>Dashboard</span>
                  </Link>
               </li>
               <li>
                  <Link href="/shouts">
                     <FontAwesomeIcon icon={faBullhorn} />
                     {isMenuExpanded ? <p>Shouts</p> : <></>}
                     <span className={styles.tool_tip}>Shouts</span>
                  </Link>
               </li>
               <li>
                  <Link href="/members">
                     <FontAwesomeIcon icon={faUsers} />
                     {isMenuExpanded ? <p>Members</p> : <></>}
                     <span className={styles.tool_tip}>Members</span>
                  </Link>
               </li>
               <li>
                  <Link href="/tasks">
                     <FontAwesomeIcon icon={faListCheck} />
                     {isMenuExpanded ? <p>Tasks</p> : <></>}
                     <span className={styles.tool_tip}>Tasks</span>
                  </Link>
               </li>
               <li>
                  <Link href="/calendar">
                     <FontAwesomeIcon icon={faCalendar} />
                     {isMenuExpanded ? <p>Calendar</p> : <></>}
                     <span className={styles.tool_tip}>Agenda</span>
                  </Link>
               </li>
               <li>
                  <Link href="/guide">
                     <FontAwesomeIcon icon={faBookOpen} />
                     {isMenuExpanded ? <p>Guide</p> : <></>}
                     <span className={styles.tool_tip}>Guide</span>
                  </Link>
               </li>
            </ul>
         </section>
         <div className={styles.bar}></div>
         <section className={styles.bottom_area}>
            <ul>
               <li>
                  <Link href="/settings">
                     <FontAwesomeIcon icon={faGear} />
                     {isMenuExpanded ? <p>Settings</p> : <></>}
                     <span className={styles.tool_tip}>Settings</span>
                  </Link>
               </li>
               <li>
                  <Link href="/home">
                     <FontAwesomeIcon icon={faHouse} />
                     {isMenuExpanded ? <p>Home</p> : <></>}
                     <span className={styles.tool_tip}>Home</span>
                  </Link>
               </li>
            </ul>
         </section>
      </nav>
   )
}
