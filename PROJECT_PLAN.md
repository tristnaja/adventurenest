# Project Plan: Portal for Outdoor Services

This document outlines the development plan, architecture, and execution steps for the "Portal for Outdoor Services" project.

## 1. Project Overview

*   **Portal Name:** AdventureNest
*   **Purpose:** To create a modern, centralized web platform for "Outdoor Services" that allows customers to easily browse, book, and manage outdoor recreational activities. The portal will replace inefficient manual processes, enhance customer engagement, and improve operational efficiency.
*   **Target Audience:**
    *   **Customers:** Individuals and groups seeking outdoor experiences.
    *   **Administrators:** Staff of "Outdoor Services" responsible for managing activities, bookings, and customer data.

## 2. Technology Stack

The project will be built using a modern, robust, and scalable technology stack.

*   **Framework:** Next.js 14+ with App Router (React)
*   **Language:** TypeScript
*   **Styling:** TailwindCSS
*   **Backend Logic:** Next.js API Routes / Server Actions
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authentication:** Next-Auth.js
*   **Payment Gateway:** Stripe
*   **Deployment:** Vercel

## 3. Portal Structure & Sitemap

The portal will feature a clean and intuitive navigation structure with 5 main menus, each containing at least 2 sub-menus as required.

1.  **Activities**
    *   **Browse All Activities:** A gallery or list view of all available services (hiking, camping, team-building, etc.) with filtering and search capabilities.
    *   **Events Calendar:** A calendar view showing scheduled activities and events by date.

2.  **Plan Your Trip**
    *   **Booking Portal:** The main interface for customers to select an activity, date, and number of participants to create a new booking.
    *   **My Bookings:** A user-specific dashboard to view and manage past and upcoming bookings.

3.  **Buy and Sell (Mandatory)**
    *   **New Gear Shop:** An e-commerce section where the company sells new outdoor equipment and merchandise.
    *   **Community Marketplace:** A C2C (customer-to-customer) platform for registered users to list, sell, and buy used gear.

4.  **Community Hub**
    *   **Forums:** A discussion board for members to ask questions, share tips, and connect with other outdoor enthusiasts.
    *   **Member Stories & Gallery:** A space for users to share photos and stories from their adventures.

5.  **About Us**
    *   **Our Mission & Team:** Information about the company, its values, and the team behind it.
    *   **Contact & Support:** A contact form, FAQ section, and support information.

## 4. High-Level Feature Breakdown

### Core Features
*   **User Authentication:** Secure user registration, login (email/password and social providers), and profile management.
*   **Admin/Customer Roles:** Differentiated access and capabilities for regular users and administrators.
*   **Activity Management (Admin):** A dashboard for admins to perform CRUD (Create, Read, Update, Delete) operations on activities, including details like descriptions, pricing, dates, and capacity.
*   **Booking System (Customer):** A seamless, multi-step process for selecting, configuring, and confirming a booking.
*   **Payment Integration:** Secure payment processing via Stripe for activity bookings and gear purchases.
*   **User Dashboard:** A private area for users to manage their profile, view booking history, and track marketplace listings.
*   **Admin Dashboard:** A comprehensive backend interface to manage bookings, users, activities, and view key business metrics.

## 5. Preliminary Database Schema

The following tables will form the core of the database structure, managed via the Prisma ORM.

*   **`User`**
    *   `id`: String (UUID)
    *   `name`: String
    *   `email`: String (unique)
    *   `password`: String (hashed)
    *   `role`: Enum (`CUSTOMER`, `ADMIN`)
    *   `createdAt`: DateTime
    *   `bookings`: Relation to `Booking`
    *   `marketplaceListings`: Relation to `MarketplaceItem`

*   **`Activity`**
    *   `id`: String (UUID)
    *   `name`: String
    *   `description`: String
    *   `price`: Decimal
    *   `capacity`: Int
    *   `startDate`: DateTime
    *   `endDate`: DateTime
    *   `bookings`: Relation to `Booking`

*   **`Booking`**
    *   `id`: String (UUID)
    *   `userId`: String (Foreign Key to `User`)
    *   `activityId`: String (Foreign Key to `Activity`)
    *   `bookingDate`: DateTime
    *   `participantCount`: Int
    *   `status`: Enum (`PENDING`, `CONFIRMED`, `CANCELLED`)
    *   `payment`: Relation to `Payment`

*   **`Payment`**
    *   `id`: String (UUID)
    *   `bookingId`: String (Foreign Key to `Booking`, unique)
    *   `amount`: Decimal
    *   `stripePaymentIntentId`: String (unique)
    *   `status`: String
    *   `createdAt`: DateTime

*   **`Product` (For New Gear Shop)**
    *   `id`: String (UUID)
    *   `name`: String
    *   `description`: String
    *   `price`: Decimal
    *   `stock`: Int

*   **`MarketplaceItem` (For Used Gear)**
    *   `id`: String (UUID)
    *   `sellerId`: String (Foreign Key to `User`)
    *   `title`: String
    *   `description`: String
    *   `price`: Decimal
    *   `status`: Enum (`AVAILABLE`, `SOLD`)
    *   `createdAt`: DateTime

## 6. Execution Steps & Development Roadmap

The project will be developed in phases to ensure a structured and manageable workflow.

### Phase 1: Project Foundation & Core Models (Sprint 1)
1.  **Setup:** Initialize Next.js project with TypeScript.
2.  **Styling:** Configure TailwindCSS.
3.  **Database:** Set up Prisma ORM, connect to a PostgreSQL database, and run initial migrations for the `User`, `Activity`, and `Booking` models.


### Phase 2: Authentication & User Management (Sprint 2)
1.  **Integration:** Add and configure Next-Auth.js.
2.  **Pages:** Build the registration and login pages.
3.  **Middleware:** Protect routes based on user authentication and roles.
4.  **Profile:** Create a basic user profile page where users can view their information.

### Phase 3: Activities & Bookings (Sprint 3)
1.  **Activity Display:** Develop the UI for the "Browse All Activities" and "Events Calendar" pages.
2.  **Booking Flow:** Implement the "Booking Portal" page, allowing users to select an activity and proceed to a checkout page.
3.  **User Dashboard:** Build the "My Bookings" page for authenticated users to view their booking history.

### Phase 4: Admin Dashboard & Management (Sprint 4)
1.  **Admin Area:** Create a dedicated, access-controlled section for administrators.
2.  **Activity CRUD:** Implement forms and tables for admins to create, view, update, and delete activities.
3.  **Booking Management:** Build an interface for admins to view all system-wide bookings, filter them, and update statuses.

### Phase 5: "Buy and Sell" Implementation (Sprint 5)
1.  **Payment Gateway:** Integrate the Stripe SDK for handling payments.
2.  **New Gear Shop:** Build the product display, cart, and checkout flow for the "New Gear Shop".
3.  **Community Marketplace:** Design and implement the functionality for users to create, manage, and purchase listings in the marketplace. This will include a separate checkout flow, possibly using Stripe Connect for C2C payments.

### Phase 6: Community Features & Finalization (Sprint 6)
1.  **Forums & Gallery:** Build out the `Community Hub` sections.
2.  **Static Pages:** Populate the "About Us" and "Contact & Support" pages.
3.  **Testing & QA:** Conduct thorough responsive design testing, cross-browser checks, and end-to-end functionality tests.
4.  **Deployment:** Deploy the final application to Vercel, including environment variable configuration and production database setup.
