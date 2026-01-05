# Vercel Deployment Guide for AdventureNest

## Current Status

Your application has been deployed to Vercel, but it failed during the build process due to missing environment variables. The deployment URL is:
- **Production**: https://adventurenest-ijvbe013w-kares-projects-792d9202.vercel.app

## Why Did It Fail?

The build failed because the application requires a PostgreSQL database connection and authentication secrets to compile. These must be configured before the application can successfully deploy.

## Steps to Complete Deployment

### 1. Set Up PostgreSQL Database (Choose One Option)

#### Option A: Vercel Postgres (Recommended - Easiest)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: **adventurenest**
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres** (powered by Neon)
6. Click **Create**
7. Vercel will automatically add the following environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - And others

**Important**: You need to use `POSTGRES_PRISMA_URL` as your `DATABASE_URL` for Prisma.

#### Option B: External PostgreSQL Provider (Neon, Supabase, Railway, etc.)

If you prefer to use an external provider:

1. Create a PostgreSQL database on your chosen provider
2. Get the connection string (should look like: `postgresql://user:password@host:5432/database?sslmode=require`)
3. You'll add this as `DATABASE_URL` in step 2 below

### 2. Add Environment Variables

Go to your Vercel project settings:
1. Navigate to: **Project Settings** → **Environment Variables**
2. Add the following variables:

#### Required Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your Postgres connection string (or use `POSTGRES_PRISMA_URL` if using Vercel Postgres) | Production, Preview, Development |
| `AUTH_SECRET` | Generate using: `openssl rand -base64 32` | Production, Preview, Development |
| `NEXT_PUBLIC_APP_URL` | `https://adventurenest-kares-projects-792d9202.vercel.app` (your production URL) | Production |
| `NEXT_PUBLIC_APP_URL` | `https://adventurenest-git-[branch]-kares-projects-792d9202.vercel.app` | Preview |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Development |

#### Optional (For Google OAuth - Follow GOOGLE_AUTH_SETUP.md):

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `AUTH_GOOGLE_ID` | Your Google OAuth Client ID | Production, Preview, Development |
| `AUTH_GOOGLE_SECRET` | Your Google OAuth Client Secret | Production, Preview, Development |

**Note**: Without Google OAuth credentials, the sign-in button will not work, but the rest of the application will function normally.

### 3. Run Database Migrations

After adding environment variables, you need to set up the database schema:

#### Option A: Via Vercel Dashboard (Easiest)

1. In your Vercel project, go to **Settings** → **Functions**
2. Add a **Post-Deploy Hook** or use the Vercel CLI locally with production env:

```bash
# Pull production environment variables
vercel env pull .env.production

# Run migrations against production database
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Seed the database (optional, for initial data)
npx prisma db seed
```

#### Option B: Automatic on Next Deploy (Recommended)

The easiest way is to add a build script that runs migrations automatically:

1. Edit your `package.json` and update the build script:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
  }
}
```

2. Commit and push this change
3. Vercel will run migrations automatically on every deployment

### 4. Redeploy

Once you've completed steps 1-3:

```bash
# Trigger a new deployment
vercel --prod
```

Or simply:
- Go to Vercel dashboard
- Click on your project
- Go to **Deployments**
- Click the **three dots** on the failed deployment
- Click **Redeploy**

### 5. Verify Deployment

After successful deployment:

1. Visit your production URL
2. Check that the homepage loads
3. Try navigating to different pages
4. If you configured Google OAuth, test signing in
5. Check that database operations work (viewing activities, bookings, etc.)

## Common Issues & Solutions

### Build Still Failing?

**Check build logs**:
```bash
vercel logs [your-deployment-url]
```

**Common issues**:
- Missing `DATABASE_URL`: Make sure it's added to Production environment
- Invalid database connection: Check that your database allows connections from Vercel's IP ranges
- Prisma Client generation failed: Make sure `prisma generate` runs before `next build`

### Database Connection Errors?

- **Neon/Supabase**: Make sure your connection string includes `?sslmode=require` or `?sslmode=prefer`
- **Firewall**: Ensure your database allows connections from `0.0.0.0/0` (all IPs) or specifically Vercel's IP ranges
- **Connection pooling**: Use the pooling connection string if available (for Vercel Postgres, use `POSTGRES_PRISMA_URL`)

### Authentication Not Working?

- Make sure `AUTH_SECRET` is set and identical across all environments
- For Google OAuth: Follow the complete setup in `GOOGLE_AUTH_SETUP.md`
- Verify `NEXT_PUBLIC_APP_URL` matches your actual deployment URL
- Add your production URL to Google OAuth authorized redirect URIs

### Images Not Loading?

- Make sure `/public/icon.png` exists
- Check that team member images are either in `/public/team/` or use placeholder names
- Verify external image URLs (Unsplash) are accessible

## Post-Deployment Setup

### 1. Set Up Google OAuth (Optional but Recommended)

Follow the detailed guide in `GOOGLE_AUTH_SETUP.md` to enable Google authentication.

**Key steps**:
- Create OAuth credentials in Google Cloud Console
- Add production redirect URI: `https://[your-domain]/api/auth/callback/google`
- Add `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` to Vercel environment variables
- Redeploy

### 2. Set Up Stripe (If Using E-commerce Features)

Follow the guide in `STRIPE_SETUP.md` to enable real payment processing.

### 3. Custom Domain (Optional)

To use a custom domain instead of the Vercel-provided URL:

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `adventurenest.com`)
3. Follow Vercel's instructions to update your DNS records
4. Update `NEXT_PUBLIC_APP_URL` environment variable to use your custom domain
5. Update Google OAuth redirect URIs to use your custom domain

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment
- **Check logs**: `vercel logs [deployment-url]`

## Quick Reference Commands

```bash
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Check environment variables
vercel env ls

# Add environment variable
vercel env add DATABASE_URL

# Pull environment variables locally
vercel env pull

# Deploy to production
vercel --prod

# Inspect deployment
vercel inspect [deployment-url]
```

---

**Current Deployment Status**: ● Error (Missing environment variables)

**Next Action Required**: Complete steps 1-2 above, then redeploy.
