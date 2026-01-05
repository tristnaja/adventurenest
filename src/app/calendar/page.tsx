"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const mockEvents = [
  {
    date: new Date(2026, 0, 15),
    title: "Mountain Hiking Expedition",
  },
  {
    date: new Date(2026, 0, 24),
    title: "Weekend Camping Getaway",
  },
    {
    date: new Date(2026, 0, 25),
    title: "Weekend Camping Getaway",
  },
  {
    date: new Date(2026, 1, 5),
    title: "Kayaking Adventure",
  },
];

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 0, 1));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Events Calendar</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              events: mockEvents.map(e => e.date),
            }}
            modifiersStyles={{
              events: {
                color: "white",
                backgroundColor: "#8b5cf6",
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {mockEvents.map((event, index) => (
              <li key={index} className="p-4 rounded-md border">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
