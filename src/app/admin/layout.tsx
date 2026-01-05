import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db";
import Link from "next/link";

/**
 * Admin layout component with role-based access control and navigation sidebar.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // Get user from database and check role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/activities"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Manage Activities
            </Link>
            <Link
              href="/admin/bookings"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Manage Bookings
            </Link>
            <Link
              href="/admin/users"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Manage Users
            </Link>
            <div className="border-t border-gray-700 my-4"></div>
            <Link
              href="/"
              className="block px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Back to Site
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
