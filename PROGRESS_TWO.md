❯ gemini

 ███            █████████  ██████████ ██████   ██████ █████ ██████   █████ █████
░░░███         ███░░░░░███░░███░░░░░█░░██████ ██████ ░░███ ░░██████ ░░███ ░░███
  ░░░███      ███     ░░░  ░███  █ ░  ░███░█████░███  ░███  ░███░███ ░███  ░███
    ░░░███   ░███          ░██████    ░███░░███ ░███  ░███  ░███░░███░███  ░███
     ███░    ░███    █████ ░███░░█    ░███ ░░░  ░███  ░███  ░███ ░░██████  ░███
   ███░      ░░███  ░░███  ░███ ░   █ ░███      ░███  ░███  ░███  ░░█████  ░███
 ███░         ░░█████████  ██████████ █████     █████ █████ █████  ░░█████ █████
░░░            ░░░░░░░░░  ░░░░░░░░░░ ░░░░░     ░░░░░ ░░░░░ ░░░░░    ░░░░░ ░░░░░

Tips for getting started:
1. Ask questions, edit files, or run commands.
2. Be specific for the best results.
3. /help for more information.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadManyFiles Will attempt to read and concatenate files using patterns:                                 │
│                                                                                                             │
│ ### ReadManyFiles Result (Target Dir:                                                                       │
│ `/Users/tristan/programming_project/web_project/portal/adventurenest`)                                      │
│                                                                                                             │
│ Successfully read and concatenated content from **3 file(s)**.                                              │
│                                                                                                             │
│ **Processed Files:**                                                                                        │
│ - `HELPFUL_LINKS.md`                                                                                        │
│ - `PROGRESS_SUMMARY.md`                                                                                     │
│ - `PROJECT_PLAN.md`                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

> read @HELPFUL_LINKS.md @PROJECT_PLAN.md and @PROGRESS_SUMMARY.md and continue.

✦ I've reviewed the project plan, progress summary, and helpful links.

  The project is in a good state. Phase 1 is complete, and Phase 2 (Authentication) is partially done. The
  immediate next step is to build the UI for login/logout and then implement route protection.

  I will start by examining the existing UI components to determine the best place to add the authentication
  elements.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFolder src/components                                                                                │
│                                                                                                             │
│ Listed 5 item(s).                                                                                           │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Right, Header.tsx, Navigation.tsx, and providers.tsx. providers.tsx probably has the SessionProvider. I'll
  add the login/logout button to Header.tsx. Now, I'll read Header.tsx, Navigation.tsx, and layout.tsx to see
  how they fit together and where to put the new button.call:read_file{file_path:
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/components/Header.tsx                                                                       │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Header.tsx is just the title and Navigation. Now checking Navigation.tsx to decide where to place the auth
  buttons.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/components/Navigation.tsx                                                                   │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Navigation.tsx is just for links, so I'll put the auth buttons in Header.tsx, which is the page top
  container. Now checking src/app/layout.tsx to confirm the Header's usage and that Providers is wrapping the
  content.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/app/layout.tsx                                                                              │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ layout.tsx confirms Providers wraps Header, enabling useSession. I'll create an AuthButton client component
  using useSession to display user info and a "Sign Out" button, or a "Sign In" button if no session exists.
  I'll then import and add AuthButton to Header.tsx, placing it to the right of the navigation. Starting with
  src/components/AuthButton.tsx.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteFile Writing to src/components/AuthButton.tsx                                                       │
│                                                                                                             │
│  1 "use client";                                                                                            │
│  2                                                                                                          │
│  3 import { useSession, signIn, signOut } from "next-auth/react";                                           │
│  4 import { Button } from "@/components/ui/button";                                                         │
│  5                                                                                                          │
│  6 export default function AuthButton() {                                                                   │
│  7   const { data: session } = useSession();                                                                │
│  8                                                                                                          │
│  9   if (session) {                                                                                         │
│ 10     return (                                                                                             │
│ 11       <div className="flex items-center gap-4">                                                          │
│ 12         <p className="text-sm">                                                                          │
│ 13           {session.user?.name}                                                                           │
│ 14         </p>                                                                                             │
│ 15         <Button onClick={() => signOut()}>Sign Out</Button>                                              │
│ 16       </div>                                                                                             │
│ 17     );                                                                                                   │
│ 18   }                                                                                                      │
│ 19                                                                                                          │
│ 20   return <Button onClick={() => signIn("google")}>Sign In with Google</Button>;                          │
│ 21 }                                                                                                        │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, AuthButton created. Now adding it to Header.tsx, right after Navigation, so it'll be on the right.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/components/Header.tsx                                                                       │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, modifying Header.tsx to add the AuthButton.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  Edit src/components/Header.tsx: import React from 'react';... => import React from 'react';...           │
│                                                                                                             │
│  1   import React from 'react';                                                                             │
│  2   import { Navigation } from './Navigation';                                                             │
│  3 + import AuthButton from './AuthButton';                                                                 │
│  4                                                                                                          │
│  5   const Header = () => {                                                                                 │
│  6     return (                                                                                             │
│  9           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">                           │
│ 10             AdventureNest                                                                                │
│ 11           </h1>                                                                                          │
│ 12 +         <div className="flex items-center gap-4">                                                      │
│ 13             <Navigation />                                                                               │
│ 14 +           <AuthButton />                                                                               │
│ 15           </div>                                                                                         │
│ 16 +       </div>                                                                                           │
│ 17       </header>                                                                                          │
│ 18     );                                                                                                   │
│ 19   };                                                                                                     │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, AuthButton is done. Now, to protect routes, I'll create src/middleware.ts. Using next-auth/middleware,
  I'll protect /account and /book routes initially with a matcher, leaving the home page and auth routes open.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteFile Writing to src/middleware.ts                                                                   │
│                                                                                                             │
│ 1 export { auth as middleware } from "@/auth"                                                               │
│ 2                                                                                                           │
│ 3 // Use "matcher" to selectively apply middleware to specific routes.                                      │
│ 4 // See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher                   │
│ 5 export const config = {                                                                                   │
│ 6   matcher: ["/account/:path*", "/book"],                                                                  │
│ 7 }                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I've finished the authentication UI and route protection by creating and integrating an AuthButton and a
  middleware.ts file. Phase 2 is done. Now, I'm starting Phase 3: "Activities & Bookings," updating my task
  list accordingly.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteTodos Set 10 todo(s)                                                                                │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, Phase 3: "Activities & Bookings." I'll start with the "Browse All Activities" UI at /activities. I'll
  create mock data and display it using ShadCN's Card component within the new src/app/activities/page.tsx
  file.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteFile Writing to src/app/activities/page.tsx                                                         │
│                                                                                                             │
│  1 import {                                                                                                 │
│  2   Card,                                                                                                  │
│  3   CardContent,                                                                                           │
│  4   CardDescription,                                                                                       │
│  5   CardFooter,                                                                                            │
│  6   CardHeader,                                                                                            │
│  7   CardTitle,                                                                                             │
│  8 } from "@/components/ui/card";                                                                           │
│  9 import { Button } from "@/components/ui/button";                                                         │
│ 10                                                                                                          │
│ 11 const mockActivities = [                                                                                 │
│ 12   {                                                                                                      │
│ 13     id: "1",                                                                                             │
│ 14     name: "Mountain Hiking Expedition",                                                                  │
│ 15     description: "A challenging and rewarding hike through scenic mountain trails.",                     │
│ 16     price: 75.00,                                                                                        │
│ 17     image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop", │
│ 18   },                                                                                                     │
│ 19   {                                                                                                      │
│ 20     id: "2",                                                                                             │
│ 21     name: "Weekend Camping Getaway",                                                                     │
│ 22     description: "Escape the city and enjoy a weekend of camping under the stars.",                      │
│ 23     price: 120.00,                                                                                       │
│ 24     image:                                                                                               │
│    "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",         │
│ 25   },                                                                                                     │
│ 26   {                                                                                                      │
│ 27     id: "3",                                                                                             │
│ 28     name: "Corporate Team Building",                                                                     │
│ 29     description: "Boost morale and collaboration with our custom team-building events.",                 │
│ 30     price: 500.00,                                                                                       │
│ 31     image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop", │
│ 32   },                                                                                                     │
│ 33   {                                                                                                      │
│ 34     id: "4",                                                                                             │
│ 35     name: "Kayaking Adventure",                                                                          │
│ 36     description: "Explore serene lakes and rivers on our guided kayaking tours.",                        │
│ 37     price: 60.00,                                                                                        │
│ 38     image:                                                                                               │
│    "https://images.unsplash.com/photo-1496253452834-6274339b9be3?q=80&w=2070&auto=format&fit=crop",         │
│ 39   },                                                                                                     │
│ 40 ];                                                                                                       │
│ 41                                                                                                          │
│ 42 export default function ActivitiesPage() {                                                               │
│ 43   return (                                                                                               │
│ 44     <div>                                                                                                │
│ 45       <h1 className="text-3xl font-bold mb-8">Browse All Activities</h1>                                 │
│ 46       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">                             │
│ 47         {mockActivities.map((activity) => (                                                              │
│ 48           <Card key={activity.id} className="flex flex-col">                                             │
│ 49             <CardHeader>                                                                                 │
│ 50               <img src={activity.image} alt={activity.name} className="rounded-t-lg h-48 w-full          │
│    object-cover" />                                                                                         │
│ 51               <CardTitle className="pt-4">{activity.name}</CardTitle>                                    │
│ 52             </CardHeader>                                                                                │
│ 53             <CardContent className="flex-grow">                                                          │
│ 54               <CardDescription>{activity.description}</CardDescription>                                  │
│ 55             </CardContent>                                                                               │
│ 56             <CardFooter className="flex justify-between items-center">                                   │
│ 57               <p className="text-lg font-semibold">${activity.price.toFixed(2)}</p>                      │
│ 58               <Button>Book Now</Button>                                                                  │
│ 59             </CardFooter>                                                                                │
│ 60           </Card>                                                                                        │
│ 61         ))}                                                                                              │
│ 62       </div>                                                                                             │
│ 63     </div>                                                                                               │
│ 64   );                                                                                                     │
│ 65 }                                                                                                        │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, I've mocked the "Browse All Activities" page. Now, I'm installing the Card component from shadcn/ui
  with npx.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  Shell npx shadcn-ui@latest add card [current working directory /Users/tristan/programming_project/web_p… │
│                                                                                                             │
│ The 'shadcn-ui' package is deprecated. Please use the 'shadcn' package instead:                             │
│                                                                                                             │
│   npx shadcn@latest add card                                                                                │
│                                                                                                             │
│ For more information, visit: https://ui.shadcn.com/docs/cli                                                 │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ shadcn-ui is deprecated. Rerunning with shadcn.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  Shell npx shadcn@latest add card [current working directory /Users/tristan/programming_project/web_proj… │
│                                                                                                             │
│ ✔ Checking registry.                                                                                        │
│ ✔ Created 1 file:                                                                                           │
│   - src/components/ui/card.tsx                                                                              │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Card's in, so /activities is a go. Now for /calendar, I need a calendar component. I'll check shadcn-ui first
  for a React/Tailwind-friendly option.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  Shell npx shadcn@latest add calendar [current working directory /Users/tristan/programming_project/web_… │
│                                                                                                             │
│ ✔ Checking registry.                                                                                        │
│ ✔ Installing dependencies.                                                                                  │
│ ✔ Created 2 files:                                                                                          │
│   - src/components/ui/button.tsx                                                                            │
│   - src/components/ui/calendar.tsx                                                                          │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Calendar and button components are in. Now, I'm creating src/app/calendar/page.tsx, adding the calendar
  component, and displaying a list of mock upcoming events.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteFile Writing to src/app/calendar/page.tsx                                                           │
│                                                                                                             │
│  1 "use client";                                                                                            │
│  2                                                                                                          │
│  3 import * as React from "react";                                                                          │
│  4 import { Calendar } from "@/components/ui/calendar";                                                     │
│  5                                                                                                          │
│  6 const mockEvents = [                                                                                     │
│  7   {                                                                                                      │
│  8     date: new Date(2026, 0, 15),                                                                         │
│  9     title: "Mountain Hiking Expedition",                                                                 │
│ 10   },                                                                                                     │
│ 11   {                                                                                                      │
│ 12     date: new Date(2026, 0, 24),                                                                         │
│ 13     title: "Weekend Camping Getaway",                                                                    │
│ 14   },                                                                                                     │
│ 15     {                                                                                                    │
│ 16     date: new Date(2026, 0, 25),                                                                         │
│ 17     title: "Weekend Camping Getaway",                                                                    │
│ 18   },                                                                                                     │
│ 19   {                                                                                                      │
│ 20     date: new Date(2026, 1, 5),                                                                          │
│ 21     title: "Kayaking Adventure",                                                                         │
│ 22   },                                                                                                     │
│ 23 ];                                                                                                       │
│ 24                                                                                                          │
│ 25 export default function CalendarPage() {                                                                 │
│ 26   const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 0, 1));                        │
│ 27                                                                                                          │
│ 28   return (                                                                                               │
│ 29     <div>                                                                                                │
│ 30       <h1 className="text-3xl font-bold mb-8">Events Calendar</h1>                                       │
│ 31       <div className="grid md:grid-cols-2 gap-8">                                                        │
│ 32         <div>                                                                                            │
│ 33           <Calendar                                                                                      │
│ 34             mode="single"                                                                                │
│ 35             selected={date}                                                                              │
│ 36             onSelect={setDate}                                                                           │
│ 37             className="rounded-md border"                                                                │
│ 38             modifiers={{                                                                                 │
│ 39               events: mockEvents.map(e => e.date),                                                       │
│ 40             }}                                                                                           │
│ 41             modifiersStyles={{                                                                           │
│ 42               events: {                                                                                  │
│ 43                 color: "white",                                                                          │
│ 44                 backgroundColor: "#8b5cf6",                                                              │
│ 45               },                                                                                         │
│ 46             }}                                                                                           │
│ 47           />                                                                                             │
│ 48         </div>                                                                                           │
│ 49         <div>                                                                                            │
│ 50           <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>                                   │
│ 51           <ul className="space-y-4">                                                                     │
│ 52             {mockEvents.map((event, index) => (                                                          │
│ 53               <li key={index} className="p-4 rounded-md border">                                         │
│ 54                 <p className="font-semibold">{event.title}</p>                                           │
│ 55                 <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>       │
│ 56               </li>                                                                                      │
│ 57             ))}                                                                                          │
│ 58           </ul>                                                                                          │
│ 59         </div>                                                                                           │
│ 60       </div>                                                                                             │
│ 61     </div>                                                                                               │
│ 62   );                                                                                                     │
│ 63 }                                                                                                        │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, "Events Calendar" page done. That's the first subtask of Phase 3 complete. Updating my todos.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteTodos Set 10 todo(s)                                                                                │
│                                                                                                             │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, I'm starting the "Booking Flow" by creating the "Booking Portal" at /book. It's a protected route, so
  users must be logged in. I'll build a simple booking form using shadcn/ui, installing the input, label, and
  select components now. It won't have a backend yet, just the UI.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  Shell npx shadcn@latest add input label select [current working directory /Users/tristan/programming_pr… │
│                                                                                                             │
│ ✔ Checking registry.                                                                                        │
│ ✔ Installing dependencies.                                                                                  │
│ ✔ Created 3 files:                                                                                          │
│   - src/components/ui/input.tsx                                                                             │
│   - src/components/ui/label.tsx                                                                             │
│   - src/components/ui/select.tsx                                                                            │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ Okay, I have the form components. Time to create src/app/book/page.tsx. It'll be a booking form with fields
  for activity, date, and participants, pre-filled with my mock activity data.
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  WriteFile Writing to src/app/book/page.tsx                                                               │
│                                                                                                             │
│  1 "use client";                                                                                            │
│  2                                                                                                          │
│  3 import * as React from "react";                                                                          │
│  4 import { Button } from "@/components/ui/button";                                                         │
│  5 import {                                                                                                 │
│  6   Card,                                                                                                  │
│  7   CardContent,                                                                                           │
│  8   CardDescription,                                                                                       │
│  9   CardFooter,                                                                                            │
│ 10   CardHeader,                                                                                            │
│ 11   CardTitle,                                                                                             │
│ 12 } from "@/components/ui/card";                                                                           │
│ 13 import { Input } from "@/components/ui/input";                                                           │
│ 14 import { Label } from "@/components/ui/label";                                                           │
│ 15 import {                                                                                                 │
│ 16   Select,                                                                                                │
│ 17   SelectContent,                                                                                         │
│ 18   SelectItem,                                                                                            │
│ 19   SelectTrigger,                                                                                         │
│ 20   SelectValue,                                                                                           │
│ 21 } from "@/components/ui/select";                                                                         │
│ 22                                                                                                          │
│ 23 const mockActivities = [                                                                                 │
│ 24   {                                                                                                      │
│ 25     id: "1",                                                                                             │
│ 26     name: "Mountain Hiking Expedition",                                                                  │
│ 27   },                                                                                                     │
│ 28   {                                                                                                      │
│ 29     id: "2",                                                                                             │
│ 30     name: "Weekend Camping Getaway",                                                                     │
│ 31   },                                                                                                     │
│ 32   {                                                                                                      │
│ 33     id: "3",                                                                                             │
│ 34     name: "Corporate Team Building",                                                                     │
│ 35   },                                                                                                     │
│ 36   {                                                                                                      │
│ 37     id: "4",                                                                                             │
│ 38     name: "Kayaking Adventure",                                                                          │
│ 39   },                                                                                                     │
│ 40 ];                                                                                                       │
│ 41                                                                                                          │
│ 42 export default function BookingPage() {                                                                  │
│ 43   return (                                                                                               │
│ 44     <div className="flex justify-center">                                                                │
│ 45       <Card className="w-full max-w-2xl">                                                                │
│ 46         <CardHeader>                                                                                     │
│ 47           <CardTitle>Create a New Booking</CardTitle>                                                    │
│ 48           <CardDescription>                                                                              │
│ 49             Select an activity and fill in the details to start your adventure.                          │
│ 50           </CardDescription>                                                                             │
│ 51         </CardHeader>                                                                                    │
│ 52         <CardContent>                                                                                    │
│ 53           <form>                                                                                         │
│ 54             <div className="grid w-full items-center gap-4">                                             │
│ 55               <div className="flex flex-col space-y-1.5">                                                │
│ 56                 <Label htmlFor="activity">Activity</Label>                                               │
│ 57                 <Select>                                                                                 │
│ 58                   <SelectTrigger id="activity">                                                          │
│ 59                     <SelectValue placeholder="Select an activity" />                                     │
│ 60                   </SelectTrigger>                                                                       │
│ 61                   <SelectContent position="popper">                                                      │
│ 62                     {mockActivities.map((activity) => (                                                  │
│ 63                       <SelectItem key={activity.id} value={activity.id}>                                 │
│ 64                         {activity.name}                                                                  │
│ 65                       </SelectItem>                                                                      │
│ 66                     ))}                                                                                  │
│ 67                   </SelectContent>                                                                       │
│ 68                 </Select>                                                                                │
│ 69               </div>                                                                                     │
│ 70               <div className="flex flex-col space-y-1.5">                                                │
│ 71                 <Label htmlFor="date">Date</Label>                                                       │
│ 72                 <Input id="date" type="date" />                                                          │
│ 73               </div>                                                                                     │
│ 74               <div className="flex flex-col space-y-1.5">                                                │
│ 75                 <Label htmlFor="participants">Number of Participants</Label>                             │
│ 76                 <Input id="participants" type="number" min="1" defaultValue="1" />                       │
│ 77               </div>                                                                                     │
│ 78             </div>                                                                                       │
│ 79           </form>                                                                                        │
│ 80         </CardContent>                                                                                   │
│ 81         <CardFooter className="flex justify-end">                                                        │
│ 82           <Button>Proceed to Payment</Button>                                                            │
│ 83         </CardFooter>                                                                                    │
│ 84       </Card>                                                                                            │
│ 85     </div>                                                                                               │
│ 86   );                                                                                                     │
│ 87 }                                                                                                        │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✕ [API Error: You have exhausted your capacity on this model. Your quota will reset after 22h58m31s.]

───────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Todo  8/10 completed (ctrl+t to toggle)

 ✓ Setup: Initialize Next.js project with TypeScript.
 ✓ Styling: Configure TailwindCSS.
 ✓ Database: Set up Prisma ORM, connect to a PostgreSQL database, and run initial migrations for the `User`,
   `Activity`, and `Booking` models.
 ✓ Integration: Add and configure Next-Auth.js.
 ✓ Pages: Build the registration and login pages.
 ✓ Middleware: Protect routes based on user authentication and roles.
 ✓ Profile: Create a basic user profile page where users can view their information.
 ✓ Activity Display: Develop the UI for the "Browse All Activities" and "Events Calendar" pages.
 » Booking Flow: Implement the "Booking Portal" page, allowing users to select an activity and proceed to a
   checkout page.
 ☐ User Dashboard: Build the "My Bookings" page for authenticated users to view their booking history.
