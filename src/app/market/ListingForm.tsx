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
import { createListing } from "./actions";
import { useRouter } from "next/navigation";

/**
 * Form component for creating new marketplace listings.
 */
export default function ListingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createListing(formData);

      if (result.success) {
        setSuccess("Listing created successfully!");
        setTimeout(() => {
          router.push("/market/my-listings");
        }, 1500);
      } else {
        setError(result.error || "Failed to create listing");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>List Your Item</CardTitle>
        <CardDescription>
          Fill in the details about the gear you want to sell
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
            <Label htmlFor="title">Item Title</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="e.g., Hiking Backpack 60L"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Describe the item's condition, features, and any defects..."
              className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/market")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
