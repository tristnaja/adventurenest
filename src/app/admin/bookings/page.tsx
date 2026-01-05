export const dynamic = "force-dynamic";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookingStatusButton from "./BookingStatusButton";

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
 * Admin page for managing all bookings in the system.
 */
export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { bookingDate: "desc" },
    include: {
      activity: true,
      user: true,
    },
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    confirmed: bookings.filter((b) => b.status === "CONFIRMED").length,
    cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
        <p className="text-muted-foreground">
          View and manage all bookings in the system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Cancelled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            Complete list of all bookings in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No bookings yet</p>
            </div>
          ) : (
            <Table>
              <TableCaption>All system bookings</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date Booked</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs">
                      {booking.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {booking.user.name || "N/A"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.activity.name}</TableCell>
                    <TableCell>
                      {booking.bookingDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{booking.participantCount}</TableCell>
                    <TableCell>
                      $
                      {(
                        Number(booking.activity.price) *
                        booking.participantCount
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className={getStatusColor(booking.status)}>
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <BookingStatusButton
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
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
