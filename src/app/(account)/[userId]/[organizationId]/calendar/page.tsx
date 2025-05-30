import AccountPageLayout from "@/components/account-pages/account-page-layout";
import CalendarSection from "./calendar";
export default async function Calendar({ params }: { params: { userId: string, organizationId: string } }) {
  const { userId, organizationId } = await params;
  return (
    <AccountPageLayout>
      <CalendarSection userId={userId} organizationId={organizationId} />
    </AccountPageLayout>
  )
}
