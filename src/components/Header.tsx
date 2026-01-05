import React from "react";
import { Navigation } from "./Navigation";
import MobileNav from "./MobileNav";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo - Always on the left */}
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer"
        >
          <Image
            src="/icon.png"
            alt="AdventureNest Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="hidden sm:inline">AdventureNest</span>
        </Link>

        {/* Mobile Menu - Only visible on small screens, on the right */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-4">
          <Navigation />
          <CartButton />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
