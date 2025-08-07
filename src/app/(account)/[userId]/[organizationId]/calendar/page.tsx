import AccountPageLayout from "@/components/account-pages/account-page-layout";
import CalendarSection from "./calendar";
import { getOrganizationEvents } from "../../actions";
import { CalendarEvent } from "@/types/calendar";
export default async function Calendar({ params }: { params: { userId: string; organizationId: string } }) {
  const { userId, organizationId } = await params;

  let organizationEvents = await getOrganizationEvents(organizationId);

  // Serialize ObjectIds (and other non-serializable fields) to strings
  organizationEvents = organizationEvents.map((event) => ({
    ...event,
    _id: event._id ? event._id.toString() : "error",
  }));

  return (
    <AccountPageLayout>
      <CalendarSection userId={userId} organizationId={organizationId} organizationEvents={organizationEvents} />
    </AccountPageLayout>
  );
}
