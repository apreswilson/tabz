import AccountPageLayout from "@/components/account-pages/account-page-layout";
import Dashboard from "./dashboard";
import { getCompletedTasks, getInProgressTasks, getRecentShouts, getUpcomingEvents } from "../../actions";
import { CalendarEvent } from "@/types/calendar";
import { Shout } from "@/types/shout";
import { Task } from "@/types/task";

export default async function DashboardPage({ params }: { params: { userId: string; organizationId: string } }) {
  const { userId, organizationId } = await params;

  const [upcomingEvents, recentShouts, completedTasks, incompleteTasks] = await Promise.all([
    getUpcomingEvents(organizationId),
    getRecentShouts(organizationId),
    getCompletedTasks(organizationId),
    getInProgressTasks(organizationId),
  ]);

  const serializedEvents: CalendarEvent[] = JSON.parse(JSON.stringify(upcomingEvents));
  const serializedShouts: Shout[] = JSON.parse(JSON.stringify(recentShouts));
  const serializedCompletedTasks: Task[] = JSON.parse(JSON.stringify(completedTasks));
  const serializedIncompleteTasks: Task[] = JSON.parse(JSON.stringify(incompleteTasks));

  return (
    <AccountPageLayout>
      <Dashboard
        upcomingEvents={serializedEvents}
        recentShouts={serializedShouts}
        incompleteTasks={serializedIncompleteTasks}
        completeTasks={serializedCompletedTasks}
      />
    </AccountPageLayout>
  );
}
