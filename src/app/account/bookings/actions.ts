'use server';

import { prisma } from '@/lib/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

/**
 * Cancels a booking for the authenticated user.
 * Only allows cancellation if the booking belongs to the current user.
 */
export async function cancelBooking(bookingId: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: 'You must be signed in to cancel a booking' };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify the booking belongs to this user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.userId !== user.id) {
      return { success: false, error: 'You can only cancel your own bookings' };
    }

    // Check if booking is already cancelled
    if (booking.status === 'CANCELLED') {
      return { success: false, error: 'This booking is already cancelled' };
    }

    // Update booking status to CANCELLED
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    // Revalidate the bookings page to show updated data
    revalidatePath('/account/bookings');

    return { success: true, message: 'Booking cancelled successfully' };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return { success: false, error: 'Failed to cancel booking. Please try again.' };
  }
}

/**
 * Deletes a booking completely from the database.
 * Only allows deletion if the booking belongs to the current user.
 */
export async function deleteBooking(bookingId: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: 'You must be signed in to delete a booking' };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify the booking belongs to this user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.userId !== user.id) {
      return { success: false, error: 'You can only delete your own bookings' };
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    // Revalidate the bookings page to show updated data
    revalidatePath('/account/bookings');

    return { success: true, message: 'Booking deleted successfully' };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: 'Failed to delete booking. Please try again.' };
  }
}
