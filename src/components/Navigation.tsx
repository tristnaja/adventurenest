"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const menuItems = {
  Activities: [
    {
      title: "Browse All Activities",
      href: "/activities",
      description:
        "Find your next adventure from our full range of activities.",
    },
    {
      title: "Events Calendar",
      href: "/calendar",
      description: "See what's happening and when with our events calendar.",
    },
  ],
  "Plan Your Trip": [
    {
      title: "Booking Portal",
      href: "/book",
      description: "Ready to go? Start a new booking here.",
    },
    {
      title: "My Bookings",
      href: "/account/bookings",
      description: "View and manage your upcoming and past adventures.",
    },
  ],
  "Buy and Sell": [
    {
      title: "New Gear Shop",
      href: "/shop",
      description: "Get the best new gear, tested and recommended by us.",
    },
    {
      title: "Community Marketplace",
      href: "/market",
      description: "Buy and sell used gear with other members.",
    },
  ],
  "Community Hub": [
    {
      title: "Forums",
      href: "/community/forums",
      description:
        "Join the discussion, ask questions, and share your knowledge.",
    },
    {
      title: "Member Stories",
      href: "/community/stories",
      description:
        "Read inspiring stories and see photos from fellow adventurers.",
    },
  ],
  "About Us": [
    {
      title: "Our Mission & Team",
      href: "/about",
      description: "Learn more about who we are and what drives us.",
    },
    {
      title: "Contact & Support",
      href: "/contact",
      description: "Get in touch with us for any questions or support needs.",
    },
  ],
};

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(menuItems).map(([title, subItems]) => (
          <NavigationMenuItem key={title}>
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150 ">
                {subItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
