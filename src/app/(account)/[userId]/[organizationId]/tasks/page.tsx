import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./tasks.module.scss";
import Organization from "@/models/Organization";
import CompletedTasksTable from "./completed";
import NonFinishedTasks from "./not-completed";

export interface TasksInterface {
   _id: string,
   taskName: string,
   roles: string,
   priority: string,
   deadline: string,
   status: string
}

export default async function Tasks({ params }: { params: { userId: string, organizationId: string } }) {
   const { userId, organizationId } = await params;
   const fetchOrganizationData = await Organization.findById({ _id: organizationId })
   const organizedTasks: TasksInterface[] = fetchOrganizationData.tasks.map(({ _id, taskName, roles, priority, deadline, status }: TasksInterface) => ({
      _id: _id.toString(),
      taskName,
      roles,
      priority,
      deadline,
      status
   }));
   const incompleteTasks: TasksInterface[] = organizedTasks.filter((task) => task.status !== "Complete");
   const completedTasks: TasksInterface[] = organizedTasks.filter((task) => task.status === "Complete");

   return (
      <AccountPageLayout>
         <section>
            <section className={styles.tasks_section}>
               <h1>Incomplete Tasks</h1>
               <NonFinishedTasks tasksInProgress={incompleteTasks} organizationId={organizationId} userId={userId} />
               <h1>Complete Tasks</h1>
               <CompletedTasksTable completeTasks={completedTasks} organizationId={organizationId} userId={userId} />
            </section>
         </section>
      </AccountPageLayout>
   )
}