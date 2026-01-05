"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Validates that the current user is an admin.
 * @returns User object if admin, throws error otherwise
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
 * Server action to create a new activity.
 */
export async function createActivity(formData: FormData) {
  try {
    await validateAdmin();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const capacity = parseInt(formData.get("capacity") as string);
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);

    // Validation
    if (!name || !description || isNaN(price) || isNaN(capacity)) {
      return { success: false, error: "Invalid input data" };
    }

    if (startDate >= endDate) {
      return { success: false, error: "End date must be after start date" };
    }

    await prisma.activity.create({
      data: {
        name,
        description,
        price,
        capacity,
        startDate,
        endDate,
      },
    });

    revalidatePath("/admin/activities");
    revalidatePath("/activities");

    return { success: true };
  } catch (error) {
    console.error("Error creating activity:", error);
    return { success: false, error: "Failed to create activity" };
  }
}

/**
 * Server action to update an existing activity.
 */
export async function updateActivity(id: string, formData: FormData) {
  try {
    await validateAdmin();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const capacity = parseInt(formData.get("capacity") as string);
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);

    // Validation
    if (!name || !description || isNaN(price) || isNaN(capacity)) {
      return { success: false, error: "Invalid input data" };
    }

    if (startDate >= endDate) {
      return { success: false, error: "End date must be after start date" };
    }

    await prisma.activity.update({
      where: { id },
      data: {
        name,
        description,
        price,
        capacity,
        startDate,
        endDate,
      },
    });

    revalidatePath("/admin/activities");
    revalidatePath("/activities");

    return { success: true };
  } catch (error) {
    console.error("Error updating activity:", error);
    return { success: false, error: "Failed to update activity" };
  }
}

/**
 * Server action to delete an activity.
 */
export async function deleteActivity(id: string) {
  try {
    await validateAdmin();

    // Check if activity has bookings
    const bookingCount = await prisma.booking.count({
      where: { activityId: id },
    });

    if (bookingCount > 0) {
      return {
        success: false,
        error: `Cannot delete activity with ${bookingCount} existing booking(s)`,
      };
    }

    await prisma.activity.delete({
      where: { id },
    });

    revalidatePath("/admin/activities");
    revalidatePath("/activities");

    return { success: true };
  } catch (error) {
    console.error("Error deleting activity:", error);
    return { success: false, error: "Failed to delete activity" };
  }
}
