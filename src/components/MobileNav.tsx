"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";

const menuItems = {
  Activities: [
    {
      title: "Browse All Activities",
      href: "/activities",
      description: "Find your next adventure from our full range of activities.",
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
      description: "Join the discussion, ask questions, and share your knowledge.",
    },
    {
      title: "Member Stories",
      href: "/community/stories",
      description: "Read inspiring stories and see photos from fellow adventurers.",
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto p-6">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-3 pr-8">
            <Image
              src="/icon.png"
              alt="AdventureNest"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span>Menu</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-2">
          {/* Navigation Links */}
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(menuItems).map(([category, items], index) => (
              <AccordionItem key={category} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-semibold">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 pl-4">
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block"
                      >
                        <div className="space-y-1 rounded-md p-3 hover:bg-accent transition-colors">
                          <div className="text-sm font-medium">{item.title}</div>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Divider */}
          <div className="border-t pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Cart</span>
                <CartButton />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Account</span>
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
