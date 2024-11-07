import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./guide.module.scss";

export default function Guide() {
   return (
      <AccountPageLayout>
         <section>
            <section className={styles.guide_page}>

               <h1>Guide</h1>
               <p>
                  This page is a guide for any users who are unsure on how to perform various
                  actions through the Tabz platform.
               </p>
               <section className={styles.dashboard_guide}>
                  <h2>Dashboard</h2>
                  <div className={styles.guide_List}>
                     <h3>Summary</h3>
                     <p>The dashboard is meant to be an abbreviated summary of the other pages
                        available on the account pages on Tabz. The top section contains the current
                        amount of complete tasks, incomplete tasks, and upcoming events. These numbers
                        are different depending on your role. The middle row contains an abbreviated
                        version of the shouts, tasks, and calendar page. The bottom row contains
                        details for other pages user may want to navigate to depending on their needs.
                     </p>
                  </div>
               </section>
               <section className={styles.shouts_guide}>
                  <h2>Shouts</h2>
                  <div className={styles.guide_list}>
                     <h3>Summary</h3>
                     <p>
                        The shouts page is a list of announcements made by a member with shout
                        permissions to other employees. Each shout has a title, the author and their
                        role, the time of creation, the roles that the shout is relevant to, and
                        the actual contents of the shout. To view the actual contents of the shout,
                        click the &quot;View&quot; section of the shout.
                     </p>
                     <h3>Filtering View Of Shouts</h3>
                     <p>There are several ways to view a filtered view of shouts. You can search
                        specicially for a shout by entering relevant keywords into the search bar.
                        You can choose to view shouts only relevant to a certain role via the dropdown
                        menu to the right of the search bar. You can choose to view shouts only before
                        the latest date, and only after the earliest date. Both of these can be filled
                        out to specify a specific range of dates to view shouts from. These filters do
                        reset on page refresh though.
                     </p>
                     <h3>Make a New Shout</h3>
                     <p>
                        For those with shout permissions, there will be a button on the top right of
                        the page on the same row as the filter options that says &quot;New&quot;.
                        Clicking this will navigate you to a page to fill out a form that will request
                        details of the shout such as title, content, and relevant roles. Once the fields
                        have been filled out and reviewed, you have the option to either cancel the shout
                        which will clear all form field contents, or you can post the shout.
                     </p>
                  </div>
               </section>
               <section className={styles.members_guide}>
                  <h2>Members</h2>
                  <div className={styles.guide_list}>
                     <h3>Summary</h3>
                     <p>
                        The members page allows users to be able to look up other employees under
                        the organization and perform actions based on their roles permissions. Every user
                        has the ability to email the user. If your role has member permissions then you
                        are able to also edit the users information, or delete them from the organization
                        if you wish.
                     </p>
                     <h3>Inviting New Members</h3>
                     <p>
                        Employees whose role has the invite permissions or admin permissions are able
                        to invite new members to the organization. This will be a button in the top right
                        that says &quot;Add&quot;. Upon clicking this button, all that is required is
                        the email address of the user to be invited then clicking &quot;Invite&quot;.
                        This will then send an invite request to the person under that email through
                        their account page.
                     </p>
                     <h3>Editing a Members Information</h3>
                     <p>
                        Members under the role that has member permissions or admin permissions
                        has the ability to edit the information of a user. In order to do this, click
                        the pen icon under the options column on the members page. Upon doing so, a
                        section will appear directly beneath the currently edited member. The user will
                        then be able to change/update the users name, email, or role in the company. In
                        order to apply these changes, the user must click the &quot;Update&quot; button.
                     </p>
                  </div>
               </section>
               <section className={styles.tasks_guide}>
                  <h2>Tasks</h2>
                  <div className={styles.guide_list}>
                     <h3>Summary</h3>
                     <p>
                        The task page is where all the tasks will be displayed. Each user will only
                        be able to see tasks that are relevant to their roles automatically. Roles with
                        admin permissions will be able to see all tasks regardless of role. The tasks
                        page is divided into two tabled, one for incomplete and complete tasks. Each
                        task has a task description, roles relevant to the task, the priority of the task,
                        the deadline of the task, and the status. It must be noted that the priority and
                        status can only have three different options. For priority, a task can either be
                        low, medium, or high. For status, a task can either be not started, in progress,
                        or complete. When a tasks status is changed to complete, it is automatically
                        moved from the incomplete tasks table to the complete tasks table. Once there,
                        a task will sit in a queue and be removed manually by a role with task permissions.
                     </p>
                     <h3>Adding/Editing Tasks</h3>
                     <p>Any role with task permissions will have the ability to create a new task, update
                        the status or priority of a task, or delete the task in the completed table once
                        that task has been fully verified as complete. To add a new task, a row on the
                        bottom of the incomplete tasks table prompts to add task. Upon clicking, the
                        user must fill out all relevant information for creating the new task. The deadline,
                        description, and roles are not changeable once the task is created, only the status
                        and priority are. To edit the priority or status of a task, simply click on the
                        desired cell on the row of the task you wish to edit. This will then spawn a dropdown
                        presenting the three options of status and priority.
                     </p>
                  </div>
               </section>
               <section className={styles.calendar_guide}>
                  <h2>Calendar</h2>
                  <div className={styles.guide_list}>
                     <h3>Summary</h3>
                     <p>The calendar page contains a calendar that has a list of events depending on the day.
                        The page is split into two sections, the left being the calendar display, and the
                        right displaying the full list of details for the respectively selected day. Each day
                        on the calendar section will only have a max of two event titles displayed, followed
                        by a view details button beneath the titles. Upon clicking, this will update the
                        right side of the page to have the full details of events on the selected day. Each
                        event has a title, a time, relevant roles, and details for the event that are deemed
                        necessary. To view different months, click the left or right arrow depending on
                        which month you wish to navigate to.
                     </p>
                     <h3>Adding Events</h3>
                     <p>Roles with the calendar permissions will have the ability to add a new event. A button
                        that says &quot;Add Event&quot; will appear next to the arrows to view different months
                        of the calendar will appear. Upon clicking, users will be navigated to a new page where
                        they must fill out information relevant to the event. This includes the title, date,
                        time, content, and roles relevant to the event. Upon filling out and reviewing the
                        information, simply clicking the post button will add the event to the chosen day.
                     </p>
                  </div>
               </section>
            </section>
         </section>
      </AccountPageLayout>
   )
}