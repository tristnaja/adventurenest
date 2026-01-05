import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Admin dashboard page displaying key metrics and statistics.
 */
export default async function AdminDashboardPage() {
  // Fetch statistics
  const [
    totalActivities,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    totalUsers,
    totalRevenue,
  ] = await Promise.all([
    prisma.activity.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.user.count(),
    prisma.booking.findMany({
      where: { status: { in: ["CONFIRMED", "PENDING"] } },
      include: { activity: true },
    }),
  ]);

  // Calculate total revenue
  const revenue = totalRevenue.reduce((sum, booking) => {
    return sum + Number(booking.activity.price) * booking.participantCount;
  }, 0);

  // Get recent bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { bookingDate: "desc" },
    include: {
      activity: true,
      user: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform&apos;s key metrics
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalActivities}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingBookings} pending, {confirmedBookings} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From confirmed + pending bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking activity on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No bookings yet
            </p>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">{booking.activity.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.user.name || booking.user.email} •{" "}
                      {booking.participantCount} participant(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(
                        Number(booking.activity.price) *
                        booking.participantCount
                      ).toFixed(2)}
                    </p>
                    <p
                      className={`text-sm ${
                        booking.status === "CONFIRMED"
                          ? "text-green-600"
                          : booking.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
