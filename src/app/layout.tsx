import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdventureNest - Your Portal for Outdoor Services",
  description:
    "Book camping, hiking, and adventure tourism experiences. Join our community of outdoor enthusiasts and discover unforgettable adventures.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: [
      {
        rel: "icon",
        url: "/icon.png",
      },
    ],
  },
  openGraph: {
    title: "AdventureNest - Your Portal for Outdoor Services",
    description: "Book camping, hiking, and adventure tourism experiences.",
    url: "https://adventurenest.com",
    siteName: "AdventureNest",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "AdventureNest Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AdventureNest - Your Portal for Outdoor Services",
    description: "Book camping, hiking, and adventure tourism experiences.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
