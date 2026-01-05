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
import { createActivity, updateActivity } from "./actions";
import { useRouter } from "next/navigation";

type Activity = {
  id: string;
  name: string;
  description: string;
  price: number | { toNumber: () => number };
  capacity: number;
  startDate: Date;
  endDate: Date;
};

interface ActivityFormProps {
  activity?: Activity;
  isEdit?: boolean;
}

/**
 * Form component for creating or editing activities.
 */
export default function ActivityForm({ activity, isEdit = false }: ActivityFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = isEdit && activity
        ? await updateActivity(activity.id, formData)
        : await createActivity(formData);

      if (result.success) {
        setSuccess(
          isEdit ? "Activity updated successfully!" : "Activity created successfully!"
        );
        setTimeout(() => {
          router.push("/admin/activities");
        }, 1500);
      } else {
        setError(result.error || "Failed to save activity");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialPrice = activity
    ? typeof activity.price === "number"
      ? activity.price
      : activity.price.toNumber()
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Activity" : "Create New Activity"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "Update the activity details below"
            : "Fill in the details to create a new activity"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
              {success}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={activity?.name || ""}
              placeholder="e.g., Mountain Hiking Expedition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              required
              defaultValue={activity?.description || ""}
              placeholder="Describe the activity in detail..."
              className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={initialPrice}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                required
                defaultValue={activity?.capacity || ""}
                placeholder="Max participants"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                required
                defaultValue={
                  activity?.startDate
                    ? formatDateForInput(new Date(activity.startDate))
                    : ""
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                required
                defaultValue={
                  activity?.endDate
                    ? formatDateForInput(new Date(activity.endDate))
                    : ""
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/activities")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Update Activity"
              : "Create Activity"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
