"use server";

export const dynamic = 'force-dynamic'
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Server action to create a new booking.
 * Validates input, checks authentication, and creates booking in database.
 *
 * @param formData - The booking form data
 * @returns Success or error message
 */
export async function createBooking(formData: {
  activityId: string;
  date: string;
  participantCount: number;
}) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "You must be logged in to create a booking",
      };
    }

    // Validate input
    if (!formData.activityId || !formData.date || formData.participantCount < 1) {
      return {
        success: false,
        error: "Invalid booking data. Please check all fields.",
      };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Verify activity exists
    const activity = await prisma.activity.findUnique({
      where: { id: formData.activityId },
    });

    if (!activity) {
      return {
        success: false,
        error: "Activity not found",
      };
    }

    // Check if date is in the future
    const bookingDate = new Date(formData.date);
    if (bookingDate < new Date()) {
      return {
        success: false,
        error: "Cannot book activities in the past",
      };
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        activityId: formData.activityId,
        bookingDate: new Date(),
        participantCount: formData.participantCount,
        status: "PENDING",
      },
      include: {
        activity: true,
      },
    });

    // Revalidate the bookings page to show the new booking
    revalidatePath("/account/bookings");

    return {
      success: true,
      bookingId: booking.id,
      message: `Successfully booked ${activity.name}! Your booking ID is ${booking.id}`,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error: "Failed to create booking. Please try again.",
    };
  }
}
