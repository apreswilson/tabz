import NewEvent from "./form";

export default async function CreateEventPage({ params }: { params: { organizationId: string; userId: string } }) {
  const { organizationId, userId } = await params;
  return <NewEvent organizationId={organizationId} userId={userId} />;
}
