"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateBookingStatus } from "./actions";
import { BookingStatus } from "@prisma/client";

interface BookingStatusButtonProps {
  bookingId: string;
  currentStatus: BookingStatus;
}

/**
 * Component for updating booking status from admin interface.
 */
export default function BookingStatusButton({
  bookingId,
  currentStatus,
}: BookingStatusButtonProps) {
  const [status, setStatus] = React.useState<BookingStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleStatusChange = async (newStatus: BookingStatus) => {
    setIsUpdating(true);

    try {
      const result = await updateBookingStatus(bookingId, newStatus);

      if (result.success) {
        setStatus(newStatus);
      } else {
        alert(result.error || "Failed to update status");
        // Revert to previous status on error
        setStatus(currentStatus);
      }
    } catch (error) {
      alert("An unexpected error occurred");
      setStatus(currentStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={(value) => handleStatusChange(value as BookingStatus)}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
      </SelectContent>
    </Select>
  );
}
