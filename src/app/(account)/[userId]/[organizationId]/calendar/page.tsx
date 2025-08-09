import AccountPageLayout from "@/components/account-pages/account-page-layout";
import CalendarSection from "./calendar";
import { getOrganizationEvents } from "../../actions";

export default async function Calendar({ params }: { params: any }) {
  const { userId, organizationId } = params as {
    userId: string;
    organizationId: string;
  };

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
