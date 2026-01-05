"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBooking } from "./actions";
import { useRouter } from "next/navigation";

type Activity = {
  id: string;
  name: string;
  price: number | { toNumber: () => number };
};

interface BookingFormProps {
  activities: Activity[];
}

/**
 * Client component for the booking form with state management and validation.
 */
export default function BookingForm({ activities }: BookingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    activityId: "",
    date: "",
    participantCount: 1,
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: Record<string, string> = {};
    if (!formData.activityId) {
      newErrors.activityId = "Please select an activity";
    }
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }
    if (formData.participantCount < 1) {
      newErrors.participantCount = "At least 1 participant is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const result = await createBooking(formData);

      if (result.success) {
        setSuccessMessage(result.message || "Booking created successfully!");
        // Reset form
        setFormData({
          activityId: "",
          date: "",
          participantCount: 1,
        });
        // Redirect to bookings page after 2 seconds
        setTimeout(() => {
          router.push("/account/bookings");
        }, 2000);
      } else {
        setErrors({ general: result.error || "Failed to create booking" });
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create a New Booking</CardTitle>
        <CardDescription>
          Select an activity and fill in the details to start your adventure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}
        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="activity">Activity</Label>
              <Select
                value={formData.activityId}
                onValueChange={(value) => {
                  setFormData({ ...formData, activityId: value });
                  setErrors({ ...errors, activityId: "" });
                }}
              >
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {activities.map((activity) => {
                    const price = typeof activity.price === 'number'
                      ? activity.price
                      : activity.price.toNumber();
                    return (
                      <SelectItem key={activity.id} value={activity.id}>
                        {activity.name} - ${price.toFixed(2)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.activityId && (
                <p className="text-sm text-red-500">{errors.activityId}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                  setErrors({ ...errors, date: "" });
                }}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="participants">Number of Participants</Label>
              <Input
                id="participants"
                type="number"
                min="1"
                value={formData.participantCount}
                onChange={(e) => {
                  setFormData({ ...formData, participantCount: parseInt(e.target.value) || 1 });
                  setErrors({ ...errors, participantCount: "" });
                }}
              />
              {errors.participantCount && (
                <p className="text-sm text-red-500">{errors.participantCount}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
}
