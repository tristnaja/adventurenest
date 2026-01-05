import { prisma } from "@/lib/db";
import BookingForm from "./BookingForm";

/**
 * Server component that fetches activities and renders the booking form.
 */
export default async function BookingPage() {
  const activitiesRaw = await prisma.activity.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  // Convert Decimal to number for Client Component serialization
  const activities = activitiesRaw.map(activity => ({
    id: activity.id,
    name: activity.name,
    price: Number(activity.price),
  }));

  return (
    <div className="flex justify-center">
      <BookingForm activities={activities} />
    </div>
  );
}
