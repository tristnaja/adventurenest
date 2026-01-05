import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

/**
 * Admin page for managing activities (view all activities).
 */
export default async function AdminActivitiesPage() {
  const activities = await prisma.activity.findMany({
    orderBy: { startDate: "asc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Activities</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all activities
          </p>
        </div>
        <Link href="/admin/activities/new">
          <Button size="lg">Create New Activity</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Activities</CardTitle>
          <CardDescription>
            {activities.length} activity(ies) available
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No activities created yet
              </p>
              <Link href="/admin/activities/new">
                <Button>Create Your First Activity</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableCaption>All available activities in the system</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">
                      {activity.name}
                    </TableCell>
                    <TableCell>
                      {activity.startDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {activity.endDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>${Number(activity.price).toFixed(2)}</TableCell>
                    <TableCell>{activity.capacity}</TableCell>
                    <TableCell>{activity._count.bookings}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/activities/${activity.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/admin/activities/${activity.id}/delete`}>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
