import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

/**
 * Team Members Configuration
 *
 * To add team member photos:
 * 1. Place image files in /public/team/ directory (e.g., /public/team/sarah.jpg)
 * 2. Update the image path below (e.g., "/team/sarah.jpg")
 * 3. If using placeholder, initials will be shown automatically
 *
 * Recommended image specs:
 * - Size: 500x500px or larger (square)
 * - Format: JPG or PNG
 * - File size: < 500KB
 */
const teamMembers = [
  {
    name: "Tristan Al Harrish Basori",
    role: "Founder & CEO",
    bio: "Outdoor enthusiast with 15+ years of experience leading adventure tours. Passionate about making outdoor experiences accessible to everyone.",
    image: "/team/tristan.png", // Replace with actual image path
  },
  {
    name: "Surya Pradipta",
    role: "Head of Operations",
    bio: "Former park ranger turned operations expert. Ensures every adventure meets the highest safety and quality standards.",
    image: "/team/surya.jpeg", // Replace with actual image path
  },
  {
    name: "Muhammad Anugerah Eka Putra",
    role: "Customer Experience Lead",
    bio: "Dedicated to creating memorable experiences for every customer. Believes that great adventures start with great service.",
    image: "/team/putra.jpeg", // Replace with actual image path
  },
  {
    name: "Raden Ajeng Reina Shafira Gayatri",
    role: "Lead Guide",
    bio: "Certified wilderness guide with expertise in mountaineering, rock climbing, and survival skills. Safety first, adventure always.",
    image: "/team/placeholder.jpg", // Replace with actual image path
  },
  {
    name: "Farrel Candra Winata Afandi",
    role: "Marketing Director",
    bio: "Creative storyteller with a passion for outdoor adventure. Connects adventurers with their perfect experiences through compelling campaigns.",
    image: "/team/candra.jpeg", // Replace with actual image path
  },
];

/**
 * About Us page with mission and team information.
 */
export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <Image
            src="/icon.png"
            alt="AdventureNest"
            width={96}
            height={96}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">About AdventureNest</h1>
        <p className="text-xl text-muted-foreground">
          Connecting people with nature through unforgettable outdoor
          experiences
        </p>
      </div>

      {/* Mission Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            At AdventureNest, we believe that everyone deserves to experience
            the transformative power of the great outdoors. Our mission is to
            make outdoor adventures accessible, safe, and memorable for people
            of all skill levels and backgrounds.
          </p>
          <p>
            Founded in 2020, we've grown from a small team of passionate guides
            to a thriving community of outdoor enthusiasts. We offer a wide
            range of activities, from beginner-friendly day hikes to challenging
            multi-day expeditions, all led by experienced and certified guides.
          </p>
          <p>
            Beyond just providing adventure services, we're committed to
            environmental stewardship, sustainable tourism practices, and
            fostering a supportive community of outdoor lovers who care about
            protecting our natural spaces for future generations.
          </p>
        </CardContent>
      </Card>

      {/* Values Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every adventure is carefully planned with safety as our top
                priority. Our guides are certified professionals trained in
                wilderness first aid and risk management.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inclusivity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe the outdoors should be accessible to everyone. We
                offer programs for all skill levels and work to remove barriers
                to outdoor participation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We practice and promote Leave No Trace principles, partner with
                conservation organizations, and work to minimize our
                environmental impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-[1200px] mx-auto">
          {teamMembers.map((member) => {
            // Get initials for fallback
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <Card
                key={member.name}
                className="text-center w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[350px]"
              >
                <CardHeader>
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                    {member.image.includes("placeholder") ? (
                      // Show initials for placeholder
                      <span className="text-white text-3xl font-bold">
                        {initials}
                      </span>
                    ) : (
                      // Show actual image when path is provided
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
        <CardContent className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">5,000+</p>
              <p className="text-sm text-muted-foreground">Happy Adventurers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">150+</p>
              <p className="text-sm text-muted-foreground">
                Activities Offered
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">25+</p>
              <p className="text-sm text-muted-foreground">Expert Guides</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-600">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Certifications & Partnerships
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>🏆 Certified by the American Mountain Guides Association (AMGA)</p>
          <p>🌲 Partner with Leave No Trace Center for Outdoor Ethics</p>
          <p>🚑 Wilderness First Responder (WFR) certified guides</p>
          <p>♿ Accessibility-focused outdoor recreation certified</p>
          <p>🌍 Member of the Adventure Travel Trade Association (ATTA)</p>
        </CardContent>
      </Card>
    </div>
  );
}
