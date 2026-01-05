import Image from "next/image";

/**
 * Global loading state with logo animation.
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-pulse">
        <Image
          src="/icon.png"
          alt="Loading AdventureNest"
          width={120}
          height={120}
          className="rounded-2xl shadow-lg"
        />
      </div>
      <p className="mt-6 text-lg text-muted-foreground">Loading your adventure...</p>
    </div>
  );
}
