import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

/**
 * Homepage with hero section and feature highlights.
 */
export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="flex justify-center mb-6">
          <Image
            src="/icon.png"
            alt="AdventureNest"
            width={120}
            height={120}
            className="rounded-2xl shadow-lg"
            priority
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Welcome to AdventureNest
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Your portal to unforgettable outdoor experiences. From hiking and
          camping to team building and wildlife photography.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/activities">
            <Button size="lg" className="text-lg px-8 py-6">
              Browse Activities
            </Button>
          </Link>
          <Link href="/book">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose AdventureNest?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">🏔️</div>
              <CardTitle>Expert-Led Adventures</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                All our activities are led by certified guides with years of
                experience ensuring your safety and enjoyment.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <CardTitle>Safety First</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                We prioritize your safety with comprehensive risk assessments,
                proper equipment, and emergency protocols.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Join a vibrant community of outdoor enthusiasts, share experiences,
                and make lasting connections.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-2xl">Outdoor Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                From beginner-friendly day hikes to challenging multi-day
                expeditions, we offer a wide range of outdoor activities.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Hiking & Backpacking</li>
                <li>✓ Camping Experiences</li>
                <li>✓ Rock Climbing & Mountaineering</li>
                <li>✓ Water Sports (Kayaking, Rafting)</li>
                <li>✓ Corporate Team Building</li>
                <li>✓ Wildlife Photography Tours</li>
              </ul>
              <Link href="/activities">
                <Button variant="outline" className="mt-4">
                  View All Activities →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-2xl">Gear & Marketplace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Shop for premium outdoor equipment or find great deals on used gear
                in our community marketplace.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ New Gear Shop - Quality equipment and apparel</li>
                <li>✓ Community Marketplace - Buy & sell used gear</li>
                <li>✓ Expert recommendations and reviews</li>
                <li>✓ Rental equipment for major expeditions</li>
              </ul>
              <div className="flex gap-3 mt-4">
                <Link href="/shop">
                  <Button variant="outline">Shop Gear →</Button>
                </Link>
                <Link href="/market">
                  <Button variant="outline">Marketplace →</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Join Our Growing Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-blue-600">5,000+</p>
            <p className="text-muted-foreground mt-2">Happy Adventurers</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-green-600">150+</p>
            <p className="text-muted-foreground mt-2">Activities</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-purple-600">25+</p>
            <p className="text-muted-foreground mt-2">Expert Guides</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-bold text-orange-600">4.9★</p>
            <p className="text-muted-foreground mt-2">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Adventurers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic mb-4">
                "The mountain hiking expedition was life-changing! Our guide was
                knowledgeable and made everyone feel safe and included."
              </p>
              <p className="font-semibold">- Sarah M.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic mb-4">
                "Perfect for team building! Our corporate group had an amazing time
                and really bonded during the camping weekend."
              </p>
              <p className="font-semibold">- Mike K.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic mb-4">
                "As a beginner, I was nervous, but the guides were patient and
                encouraging. Can't wait for my next adventure!"
              </p>
              <p className="font-semibold">- Emma L.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-12">
        <h2 className="text-4xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-8 opacity-90">
          Book your experience today and create memories that last a lifetime
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/activities">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Explore Activities
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
