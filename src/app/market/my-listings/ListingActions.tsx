"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { updateListingStatus, deleteListing } from "../actions";

interface ListingActionsProps {
  listingId: string;
  currentStatus: "AVAILABLE" | "SOLD";
}

/**
 * Actions component for managing individual marketplace listings.
 */
export default function ListingActions({
  listingId,
  currentStatus,
}: ListingActionsProps) {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleMarkAsSold = async () => {
    if (!confirm("Mark this item as sold?")) return;

    setIsUpdating(true);
    try {
      const result = await updateListingStatus(listingId, "SOLD");
      if (!result.success) {
        alert(result.error || "Failed to update status");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkAsAvailable = async () => {
    setIsUpdating(true);
    try {
      const result = await updateListingStatus(listingId, "AVAILABLE");
      if (!result.success) {
        alert(result.error || "Failed to update status");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) {
      return;
    }

    setIsUpdating(true);
    try {
      const result = await deleteListing(listingId);
      if (!result.success) {
        alert(result.error || "Failed to delete listing");
      }
    } catch (error) {
      alert("An unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      {currentStatus === "AVAILABLE" ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAsSold}
          disabled={isUpdating}
        >
          Mark as Sold
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAsAvailable}
          disabled={isUpdating}
        >
          Mark as Available
        </Button>
      )}
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isUpdating}
      >
        Delete
      </Button>
    </div>
  );
}
