"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Server action to create a new marketplace listing.
 */
export async function createListing(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    // Validation
    if (!title || !description || isNaN(price) || price <= 0) {
      return { success: false, error: "Invalid input data" };
    }

    await prisma.marketplaceItem.create({
      data: {
        sellerId: user.id,
        title,
        description,
        price,
        status: "AVAILABLE",
      },
    });

    revalidatePath("/market");

    return { success: true };
  } catch (error) {
    console.error("Error creating listing:", error);
    return { success: false, error: "Failed to create listing" };
  }
}

/**
 * Server action to update listing status.
 */
export async function updateListingStatus(listingId: string, status: "AVAILABLE" | "SOLD") {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Verify the listing belongs to the user
    const listing = await prisma.marketplaceItem.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.sellerId !== user.id) {
      return { success: false, error: "Not authorized" };
    }

    await prisma.marketplaceItem.update({
      where: { id: listingId },
      data: { status },
    });

    revalidatePath("/market");
    revalidatePath("/market/my-listings");

    return { success: true };
  } catch (error) {
    console.error("Error updating listing status:", error);
    return { success: false, error: "Failed to update listing" };
  }
}

/**
 * Server action to delete a listing.
 */
export async function deleteListing(listingId: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Verify the listing belongs to the user
    const listing = await prisma.marketplaceItem.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.sellerId !== user.id) {
      return { success: false, error: "Not authorized" };
    }

    await prisma.marketplaceItem.delete({
      where: { id: listingId },
    });

    revalidatePath("/market");
    revalidatePath("/market/my-listings");

    return { success: true };
  } catch (error) {
    console.error("Error deleting listing:", error);
    return { success: false, error: "Failed to delete listing" };
  }
}
