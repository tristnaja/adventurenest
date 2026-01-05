"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Contact & Support page with contact form and information.
 */
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contact & Support</h1>
        <p className="text-xl text-muted-foreground">
          We're here to help! Get in touch with us for any questions or support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          {submitted ? (
            <CardContent className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for contacting us. We'll respond within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select required>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    required
                    placeholder="How can we help you?"
                    className="w-full min-h-30 px-3 py-2 rounded-md border border-input bg-background"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          )}
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">📧 Email</h3>
                <p className="text-muted-foreground">info@adventurenest.com</p>
                <p className="text-muted-foreground">
                  support@adventurenest.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">📱 Phone</h3>
                <p className="text-muted-foreground">+(62) 812-7774-5663</p>
                <p className="text-sm text-muted-foreground">
                  Mon-Fri: 9am-6pm PST
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">📍 Office</h3>
                <p className="text-muted-foreground">
                  Universiti Tun Hussein Onn Malaysia
                </p>
                <p className="text-muted-foreground">Batu Pahat, Johor</p>
                <p className="text-muted-foreground">Malaysia</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">🕐 Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9am - 6pm
                </p>
                <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  How do I book an activity?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse our activities page, select your preferred adventure,
                  and follow the booking process. You'll need to create an
                  account first.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">
                  What's your cancellation policy?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Full refund for cancellations made 7+ days before the
                  activity. 50% refund for 3-6 days notice. No refund for less
                  than 3 days.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Do I need experience?</h3>
                <p className="text-sm text-muted-foreground">
                  Not at all! We offer activities for all skill levels. Check
                  the activity description for difficulty ratings and
                  requirements.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What should I bring?</h3>
                <p className="text-sm text-muted-foreground">
                  Each activity listing includes a detailed packing list.
                  General essentials include water, snacks, appropriate
                  clothing, and sunscreen.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-600 border-red-700 dark:bg-red-700 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-white">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-white">
                For urgent matters during an active trip:
              </p>
              <p className="text-lg font-bold text-white">
                📞 +(62) 812-7774-5663
              </p>
              <p className="text-sm text-red-50 mt-2">
                Available 24/7 for active participants
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
