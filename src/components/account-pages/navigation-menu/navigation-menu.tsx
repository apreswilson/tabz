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
   faBars
} from "@fortawesome/free-solid-svg-icons";
import styles from "./navigation-menu.module.scss";

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
      }
      >
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
                  <FontAwesomeIcon icon={faRectangleList} />
                  {isMenuExpanded ? <p>Dashboard</p> : <></>}
                  <span className={styles.tool_tip}>Dashboard</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faBullhorn} />
                  {isMenuExpanded ? <p>Shouts</p> : <></>}
                  <span className={styles.tool_tip}>Shouts</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faUsers} />
                  {isMenuExpanded ? <p>Users</p> : <></>}
                  <span className={styles.tool_tip}>Users</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faListCheck} />
                  {isMenuExpanded ? <p>Tasks</p> : <></>}
                  <span className={styles.tool_tip}>Tasks</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faCalendar} />
                  {isMenuExpanded ? <p>Calendar</p> : <></>}
                  <span className={styles.tool_tip}>Agenda</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faBookOpen} />
                  {isMenuExpanded ? <p>Guide</p> : <></>}
                  <span className={styles.tool_tip}>Guide</span>
               </li>
            </ul>
         </section>
         <div className={styles.bar}></div>
         <section className={styles.bottom_area}>
            <ul>
               <li>
                  <FontAwesomeIcon icon={faGear} />
                  {isMenuExpanded ? <p>Settings</p> : <></>}
                  <span className={styles.tool_tip}>Settings</span>
               </li>
               <li>
                  <FontAwesomeIcon icon={faUser} />
                  {isMenuExpanded ? <p>Account</p> : <></>}
                  <span className={styles.tool_tip}>Account</span>
               </li>
            </ul>
         </section>
      </nav >
   )
}
