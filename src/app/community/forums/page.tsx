import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock forum data - in production, this would come from database
const mockForums = [
  {
    id: "1",
    title: "General Discussion",
    description: "Talk about anything related to outdoor adventures",
    topics: 45,
    posts: 312,
    lastPost: {
      title: "Best hiking boots for beginners?",
      author: "Sarah M.",
      date: new Date("2026-01-04"),
    },
  },
  {
    id: "2",
    title: "Trip Planning",
    description: "Share tips and ask questions about planning your next adventure",
    topics: 28,
    posts: 189,
    lastPost: {
      title: "Planning a 3-day camping trip",
      author: "Mike K.",
      date: new Date("2026-01-03"),
    },
  },
  {
    id: "3",
    title: "Gear Reviews",
    description: "Review and discuss outdoor equipment and gear",
    topics: 67,
    posts: 421,
    lastPost: {
      title: "REI Flash 55 Backpack Review",
      author: "Alex R.",
      date: new Date("2026-01-05"),
    },
  },
  {
    id: "4",
    title: "Photography",
    description: "Share your outdoor photography and get tips",
    topics: 34,
    posts: 256,
    lastPost: {
      title: "Sunrise at Mt. Rainier",
      author: "Emma L.",
      date: new Date("2026-01-02"),
    },
  },
  {
    id: "5",
    title: "Safety & First Aid",
    description: "Discuss safety practices and outdoor emergency preparedness",
    topics: 22,
    posts: 134,
    lastPost: {
      title: "Essential first aid items for hiking",
      author: "Dr. James W.",
      date: new Date("2026-01-01"),
    },
  },
];

/**
 * Community Forums page for discussions.
 * Note: Full forum functionality with database integration to be implemented.
 */
export default async function ForumsPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Forums</h1>
          <p className="text-muted-foreground">
            Connect with fellow adventurers, share tips, and ask questions
          </p>
        </div>
        {session?.user && (
          <Button size="lg">New Topic</Button>
        )}
      </div>

      {!session?.user && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <p className="text-blue-900">
              <strong>Sign in to participate!</strong> Join the discussion by signing in to post topics and replies.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {mockForums.map((forum) => (
          <Card key={forum.id} className="hover:shadow-md transition">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <CardTitle className="text-xl mb-2">
                    <Link href={`/community/forums/${forum.id}`} className="hover:underline">
                      {forum.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{forum.description}</CardDescription>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p><strong>{forum.topics}</strong> topics</p>
                  <p><strong>{forum.posts}</strong> posts</p>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-sm font-medium">{forum.lastPost.title}</p>
                  <p className="text-xs text-muted-foreground">
                    by {forum.lastPost.author} • {forum.lastPost.date.toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/community/forums/${forum.id}`}>
                  <Button variant="outline" size="sm">
                    View Forum
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle>Forum Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Be respectful and courteous to all community members</li>
            <li>Stay on topic and keep discussions relevant</li>
            <li>No spam, advertising, or self-promotion</li>
            <li>Share knowledge and help others learn</li>
            <li>Report inappropriate content to moderators</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
