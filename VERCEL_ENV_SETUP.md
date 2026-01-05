# Quick Vercel Environment Setup

## Your Deployment Failed ⚠️

The deployment to Vercel failed because environment variables are missing. Follow these steps to fix it:

## Step 1: Add a PostgreSQL Database

Go to: https://vercel.com/dashboard

1. Select project: **adventurenest**
2. Click **Storage** tab
3. Click **Create Database**
4. Select **Postgres** (powered by Neon)
5. Click **Create**

Vercel will automatically create and connect the database!

## Step 2: Add Required Environment Variables

Go to: **Project Settings** → **Environment Variables**

Add these variables (click "Add New" for each):

### AUTH_SECRET
```
AUTH_SECRET
```
Value:
```
ns8Fk1PyE+l2K+/aMtrWnRrTspyvIGnF/scVeoITRN4=
```
Select: **Production, Preview, Development**

### NEXT_PUBLIC_APP_URL (Production)
```
NEXT_PUBLIC_APP_URL
```
Value:
```
https://adventurenest-kares-projects-792d9202.vercel.app
```
Select: **Production only**

### NEXT_PUBLIC_APP_URL (Preview)
```
NEXT_PUBLIC_APP_URL
```
Value:
```
https://adventurenest-git-main-kares-projects-792d9202.vercel.app
```
Select: **Preview only**

### NEXT_PUBLIC_APP_URL (Development)
```
NEXT_PUBLIC_APP_URL
```
Value:
```
http://localhost:3000
```
Select: **Development only**

### DATABASE_URL (Only if NOT using Vercel Postgres)

If you used Vercel Postgres in Step 1, **skip this**. The database is already connected!

If you're using an external database:
```
DATABASE_URL
```
Value:
```
postgresql://username:password@host:5432/database?sslmode=require
```
Select: **Production, Preview, Development**

## Step 3: Update Build Command

To automatically run database migrations on deploy:

1. Go to **Project Settings** → **Build & Development Settings**
2. Override the **Build Command** with:
```
prisma generate && prisma migrate deploy && next build
```
3. Click **Save**

## Step 4: Redeploy

Two options:

### Option A: Via Dashboard (Easiest)
1. Go to **Deployments** tab
2. Find the failed deployment
3. Click **three dots** (⋯) → **Redeploy**
4. Check "Use existing Build Cache" is **OFF**
5. Click **Redeploy**

### Option B: Via CLI
```bash
vercel --prod
```

## Step 5: Seed the Database (First Time Only)

After successful deployment, seed your database with initial data:

```bash
# Pull production environment variables
vercel env pull .env.production

# Run seed script
npx prisma db seed
```

Or connect to your Vercel Postgres database via the dashboard and run the seed manually.

## What Happens Next?

1. Vercel will rebuild your application
2. Database migrations will run automatically
3. Your app will be live at: https://adventurenest-kares-projects-792d9202.vercel.app

## Optional: Google OAuth Setup

To enable Google Sign In, follow `GOOGLE_AUTH_SETUP.md` and add:
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Then redeploy again.

## Optional: Stripe Payment Setup

To enable real payments, follow `STRIPE_SETUP.md` and add:
- Stripe API keys
- Webhook configuration

---

**Need Help?**
- Full deployment guide: `DEPLOYMENT_GUIDE.md`
- Google OAuth: `GOOGLE_AUTH_SETUP.md`
- Stripe payments: `STRIPE_SETUP.md`

**Check Deployment Status**:
```bash
vercel ls
```

**View Logs**:
```bash
vercel logs https://adventurenest-ijvbe013w-kares-projects-792d9202.vercel.app
```
