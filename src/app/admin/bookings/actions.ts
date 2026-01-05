"use server";

export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { BookingStatus } from "@prisma/client";

/**
 * Validates that the current user is an admin.
 */
async function validateAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  return user;
}

/**
 * Server action to update booking status.
 */
export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus
) {
  try {
    await validateAdmin();

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/account/bookings");

    return { success: true };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, error: "Failed to update booking status" };
  }
}
