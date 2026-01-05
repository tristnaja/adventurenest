"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteActivity } from "../../actions";

/**
 * Page for confirming activity deletion.
 */
export default function DeleteActivityPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  const activityId = params.id as string;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteActivity(activityId);

      if (result.success) {
        router.push("/admin/activities");
      } else {
        setError(result.error || "Failed to delete activity");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Delete Activity</h1>
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Confirm Deletion</CardTitle>
          <CardDescription>
            Are you sure you want to delete this activity? This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-md mb-4">
              {error}
            </div>
          )}
          <p className="text-muted-foreground">
            Note: You cannot delete activities that have existing bookings. You
            must cancel or remove all bookings first.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/activities")}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Activity"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
