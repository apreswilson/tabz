"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import styles from "./shouts.module.scss";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { ShoutsInterface } from "./page";

interface PageState {
   searchValue: string,
   role: string,
   latest: string,
   earliest: string
}

export default function ShoutsSection({
   userId,
   organizationId,
   shouts
}: {
   userId: string,
   organizationId: string
   shouts: ShoutsInterface[]
}) {
   const [pageState, setPageState] = useState<PageState>({
      searchValue: "",
      role: "All",
      latest: "",
      earliest: ""
   })
   const [filteredShouts, setFilteredShouts] = useState<ShoutsInterface[]>(shouts)
   const fullDateInputRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

   useEffect(() => {
      const filter = shouts.filter((shout) => {
         const searchMatch = shout.title.toLowerCase().includes(pageState.searchValue.toLowerCase())
         const roleMatch = pageState.role === "All" ?
            true
            :
            Object.values(shout.relevantRoles[0]).includes(pageState.role)
         const matchesDate =
            (!fullDateInputRegex.test(pageState.earliest) || new Date(shout.timePosted) >= new Date(pageState.earliest)) &&
            (!fullDateInputRegex.test(pageState.latest) || new Date(shout.timePosted) <= new Date(pageState.latest))
         return searchMatch && roleMatch && matchesDate
      })
      setFilteredShouts(filter)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [shouts, pageState])

   const updateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;


      if (fullDateInputRegex.test(event.target.value)) {
         setPageState(prevState => ({
            ...prevState,
            [name]: event.target.value
         }))
      }
      else if (name === "role") {
         setPageState((prevState) => {
            if (prevState.role === event.target.value) {
               return prevState;
            }

            return {
               ...prevState,
               role: event.target.value
            }
         })
      } else {
         setPageState(prevState => ({
            ...prevState,
            [name]: value
         }))
      }
   }
   // console.log(pageState)

   return (
      <>
         <div className={styles.top_area}>
            <div className={styles.search}>
               <input
                  type="text"
                  placeholder="Search"
                  name="searchValue"
                  value={pageState.searchValue}
                  onChange={updateChange}
               />
               <button type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>
            </div>
            <div className={styles.categories}>
               <label htmlFor="role-selection">Roles</label>
               <select
                  name="role"
                  id="role-selection"
                  onChange={updateChange}
                  value={pageState.role}
               >
                  <option>All</option>
                  <option>Role A</option>
                  <option>Role B</option>
                  <option>Role C</option>
               </select>
            </div>
            <div className={styles.latest_date}>
               <label htmlFor="latest-date">Latest</label>
               <input
                  name="latest"
                  type="date"
                  id="latest-date"
                  min="2024-01-01"
                  value={pageState.latest}
                  onChange={updateChange}
               />
            </div>
            <div className={styles.earliest_date}>
               <label htmlFor="earliest-date">Earliest</label>
               <input
                  name="earliest"
                  type="date"
                  id="earliest-date"
                  min="2024-01-01"
                  value={pageState.earliest}
                  onChange={updateChange}
               />
            </div>
            <button className={styles.new_shout}>
               <Link href={`/${userId}/${organizationId}/shouts/new-shout`}>
                  <FontAwesomeIcon icon={faBullhorn} />
                  <p>New</p>
               </Link>
            </button>
         </div>

         <section className={styles.shouts_list}>
            {filteredShouts.map((shout: ShoutsInterface) => (
               <div key={shout._id} className={styles.shout}>
                  <h1>{shout.title}</h1>
                  <h2>
                     Posted By: {shout.author} &nbsp;
                     <span>{shout.authorRole}</span>&nbsp;
                     {shout.timePosted}
                  </h2>
                  <div className={styles.roles_to_address}>
                     <h2>Relevant Roles:</h2>
                     {Object.keys(shout.relevantRoles[0]).map((role: any) => (
                        <p key={role}>{role}</p>
                     ))}
                  </div>
                  <details>
                     <summary>View</summary>
                     <article>{shout.content}</article>
                  </details>
               </div>
            ))}
            {/* <div className={styles.view_more}>
               <button>View More</button>
            </div> */}
         </section>
      </>
   )
}