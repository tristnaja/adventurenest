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

// Mock stories data
const mockStories = [
  {
    id: "1",
    title: "My First Solo Camping Trip",
    author: "Emma L.",
    date: new Date("2026-01-03"),
    excerpt:
      "After years of camping with friends, I finally took the plunge and went solo. Here's what I learned about self-reliance and finding peace in solitude...",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "Conquering the Pacific Crest Trail",
    author: "Alex R.",
    date: new Date("2026-01-01"),
    excerpt:
      "2,650 miles. Five months. One incredible journey. This is the story of my thru-hike on the PCT and the lessons I learned along the way...",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop",
    likes: 89,
    comments: 23,
  },
  {
    id: "3",
    title: "Winter Camping: A Beginner's Experience",
    author: "Mike K.",
    date: new Date("2025-12-28"),
    excerpt:
      "I never thought I'd enjoy camping in freezing temperatures, but this winter camping trip changed my perspective completely...",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop",
    likes: 42,
    comments: 15,
  },
  {
    id: "4",
    title: "Family Adventures: Introducing Kids to Nature",
    author: "Sarah M.",
    date: new Date("2025-12-25"),
    excerpt:
      "Taking young children camping can be challenging, but it's one of the most rewarding experiences. Here are my tips for making it work...",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
    likes: 56,
    comments: 19,
  },
  {
    id: "5",
    title: "Photographing Wildlife: Tips from the Trail",
    author: "James W.",
    date: new Date("2025-12-20"),
    excerpt:
      "Capturing stunning wildlife photos requires patience, the right gear, and understanding animal behavior. Here's what I've learned...",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=2070&auto=format&fit=crop",
    likes: 67,
    comments: 12,
  },
  {
    id: "6",
    title: "Backpacking Through Patagonia",
    author: "Carlos R.",
    date: new Date("2025-12-15"),
    excerpt:
      "Three weeks in one of the most beautiful and challenging landscapes on Earth. This is my Patagonia adventure story...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    likes: 103,
    comments: 27,
  },
];

/**
 * Member Stories & Gallery page for sharing adventures.
 */
export default async function StoriesPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Member Stories & Gallery</h1>
          <p className="text-muted-foreground">
            Share your adventures and get inspired by others
          </p>
        </div>
        {session?.user && (
          <Button size="lg">Share Your Story</Button>
        )}
      </div>

      {!session?.user && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <p className="text-blue-900">
              <strong>Sign in to share!</strong> Create an account to share your
              outdoor adventures and photos with the community.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockStories.map((story) => (
          <Card key={story.id} className="flex flex-col overflow-hidden">
            <div className="relative h-64">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{story.title}</CardTitle>
              <CardDescription>
                by {story.author} • {story.date.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{story.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>❤️ {story.likes}</span>
                <span>💬 {story.comments}</span>
              </div>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle>Share Your Adventure</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Have an amazing outdoor story to tell? We'd love to hear about your
            adventures! Share your experiences, photos, and lessons learned with
            the community.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Include high-quality photos from your trip</li>
            <li>Share practical tips and lessons learned</li>
            <li>Be respectful and inspiring to fellow adventurers</li>
            <li>Tag locations and activities to help others discover new places</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
