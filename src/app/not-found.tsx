import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found page with branding.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8">
        <Image
          src="/icon.png"
          alt="AdventureNest"
          width={120}
          height={120}
          className="rounded-2xl shadow-lg mx-auto"
        />
      </div>

      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Looks like you've wandered off the trail! The page you're looking for doesn't exist.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
        <Link href="/activities">
          <Button size="lg" variant="outline">Browse Activities</Button>
        </Link>
      </div>
    </div>
  );
}
