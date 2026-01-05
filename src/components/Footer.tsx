import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="AdventureNest Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              AdventureNest
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} AdventureNest. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
