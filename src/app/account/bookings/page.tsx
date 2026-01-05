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
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import BookingActions from "./BookingActions";

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "text-green-600 font-semibold";
    case "PENDING":
      return "text-yellow-600 font-semibold";
    case "CANCELLED":
      return "text-red-600 font-semibold";
    default:
      return "text-gray-600";
  }
};

/**
 * Server component that fetches and displays the current user's bookings.
 */
export default async function MyBookingsPage() {
  // Get current session
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">User not found</p>
      </div>
    );
  }

  // Fetch user's bookings
  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      activity: true,
    },
    orderBy: {
      bookingDate: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your activity bookings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>
            All your past and upcoming adventure bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You haven&apos;t made any bookings yet.
              </p>
              <Link href="/activities">
                <Button>Browse Activities</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of all your bookings</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Booked On</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{booking.activity.name}</TableCell>
                    <TableCell>
                      {booking.bookingDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{booking.participantCount}</TableCell>
                    <TableCell>
                      <span className={getStatusColor(booking.status)}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      $
                      {(
                        Number(booking.activity.price) *
                        booking.participantCount
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <BookingActions
                        bookingId={booking.id}
                        status={booking.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/book">
          <Button size="lg">Book a New Adventure</Button>
        </Link>
      </div>
    </div>
  );
}
