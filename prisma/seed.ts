import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seeds the database with initial sample data for development and testing.
 */
async function main() {
  console.log('Starting database seed...');

  // Clear existing data (optional - comment out if you want to preserve existing data)
  console.log('Clearing existing activities...');
  await prisma.activity.deleteMany();

  // Seed Activities
  console.log('Creating sample activities...');
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Mountain Hiking Expedition',
        description: 'A challenging and rewarding hike through scenic mountain trails. Experience breathtaking views and connect with nature on this full-day adventure.',
        price: 75.00,
        capacity: 15,
        startDate: new Date('2026-01-15T08:00:00'),
        endDate: new Date('2026-01-15T17:00:00'),
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Weekend Camping Getaway',
        description: 'Escape the city and enjoy a weekend of camping under the stars. Includes guided setup, campfire activities, and outdoor cooking lessons.',
        price: 120.00,
        capacity: 20,
        startDate: new Date('2026-01-24T15:00:00'),
        endDate: new Date('2026-01-26T12:00:00'),
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Corporate Team Building',
        description: 'Boost morale and collaboration with our custom team-building events. Includes outdoor challenges, problem-solving activities, and team dinners.',
        price: 500.00,
        capacity: 50,
        startDate: new Date('2026-02-05T09:00:00'),
        endDate: new Date('2026-02-05T18:00:00'),
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Kayaking Adventure',
        description: 'Explore serene lakes and rivers on our guided kayaking tours. Perfect for beginners and experienced paddlers alike.',
        price: 60.00,
        capacity: 12,
        startDate: new Date('2026-02-10T10:00:00'),
        endDate: new Date('2026-02-10T15:00:00'),
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Rock Climbing Workshop',
        description: 'Learn the fundamentals of rock climbing from certified instructors. All equipment provided for this half-day introductory course.',
        price: 85.00,
        capacity: 10,
        startDate: new Date('2026-02-15T09:00:00'),
        endDate: new Date('2026-02-15T13:00:00'),
      },
    }),
    prisma.activity.create({
      data: {
        name: 'Wildlife Photography Tour',
        description: 'Capture stunning wildlife moments in their natural habitat. Led by professional photographers who will teach you techniques for amazing shots.',
        price: 95.00,
        capacity: 8,
        startDate: new Date('2026-02-20T06:00:00'),
        endDate: new Date('2026-02-20T12:00:00'),
      },
    }),
  ]);

  console.log(`Created ${activities.length} activities`);

  // Optional: Create sample products for the gear shop
  console.log('Creating sample products...');
  await prisma.product.deleteMany();

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Professional Hiking Backpack',
        description: '60L capacity backpack with ergonomic design and weather-resistant materials.',
        price: 149.99,
        stock: 25,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Camping Tent (4-Person)',
        description: 'Spacious 4-person tent with easy setup and waterproof construction.',
        price: 249.99,
        stock: 15,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Portable Water Filter',
        description: 'Compact water filtration system perfect for hiking and camping.',
        price: 39.99,
        stock: 50,
      },
    }),
  ]);

  console.log(`Created ${products.length} products`);

  console.log('Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
