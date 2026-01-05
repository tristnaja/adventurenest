import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";

// Image mapping for activities (in production, these would be stored in the database)
const activityImages: Record<string, string> = {
  "Mountain Hiking Expedition": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop",
  "Weekend Camping Getaway": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop",
  "Corporate Team Building": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop",
  "Kayaking Adventure": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
  "Rock Climbing Workshop": "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop",
  "Wildlife Photography Tour": "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&auto=format&fit=crop",
};

const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop";

/**
 * Server component that fetches and displays all available activities from the database.
 */
export default async function ActivitiesPage() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      startDate: 'asc',
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Browse All Activities</h1>
      {activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No activities available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card key={activity.id} className="flex flex-col">
              <CardHeader>
                <img
                  src={activityImages[activity.name] || defaultImage}
                  alt={activity.name}
                  className="rounded-t-lg h-48 w-full object-cover"
                />
                <CardTitle className="pt-4">{activity.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{activity.description}</CardDescription>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Date:</strong> {activity.startDate.toLocaleDateString()}</p>
                  <p><strong>Capacity:</strong> {activity.capacity} people</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p className="text-lg font-semibold">${Number(activity.price).toFixed(2)}</p>
                <Link href="/book">
                  <Button>Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
