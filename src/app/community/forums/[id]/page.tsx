import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock topics data
const mockTopics = [
  {
    id: "1",
    title: "Best hiking trails for spring?",
    author: "John D.",
    replies: 12,
    views: 234,
    lastReply: new Date("2026-01-05"),
  },
  {
    id: "2",
    title: "Camping gear recommendations",
    author: "Sarah M.",
    replies: 8,
    views: 156,
    lastReply: new Date("2026-01-04"),
  },
  {
    id: "3",
    title: "How to prepare for a multi-day hike?",
    author: "Mike K.",
    replies: 15,
    views: 289,
    lastReply: new Date("2026-01-03"),
  },
];

/**
 * Individual forum category page showing topics.
 */
export default async function ForumCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/community/forums">
          <Button variant="outline">← Back to Forums</Button>
        </Link>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold">General Discussion</h1>
          <p className="text-muted-foreground">
            Talk about anything related to outdoor adventures
          </p>
        </div>
        {session?.user && (
          <Button size="lg">New Topic</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Topics</CardTitle>
          <CardDescription>Browse discussions in this forum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTopics.map((topic) => (
              <div
                key={topic.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold hover:underline cursor-pointer">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Started by {topic.author}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{topic.replies} replies</p>
                  <p>{topic.views} views</p>
                  <p className="text-xs">
                    {topic.lastReply.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <p className="text-center text-blue-900">
            <strong>Note:</strong> Full forum functionality with threaded discussions,
            replies, and moderation tools will be implemented in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
