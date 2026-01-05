# Google OAuth Authentication Setup Guide

This guide will walk you through setting up Google OAuth authentication for AdventureNest so users can sign in with their Google accounts.

---

## Prerequisites

- A Google account
- Your application running locally (you should be able to access http://localhost:3000)

---

## Step 1: Create a Google Cloud Console Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top and select **"New Project"**
3. Enter project details:
   - **Project Name:** AdventureNest (or your preferred name)
   - **Organization:** Leave as default if you don't have one
4. Click **"Create"**
5. Wait for the project to be created (you'll see a notification)
6. Make sure your new project is selected in the dropdown

---

## Step 2: Enable Google+ API

1. In the Google Cloud Console, open the **navigation menu** (☰)
2. Go to **"APIs & Services"** → **"Library"**
3. Search for **"Google+ API"** or **"People API"**
4. Click on it and press **"Enable"**
5. Wait for it to enable (takes a few seconds)

---

## Step 3: Configure OAuth Consent Screen

1. In the navigation menu, go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** as the user type (unless you have a Google Workspace)
3. Click **"Create"**
4. Fill in the required information:
   - **App name:** AdventureNest
   - **User support email:** Your email address
   - **App logo:** (Optional - you can skip this)
   - **App domain:** Leave blank for development
   - **Authorized domains:** Leave blank for development
   - **Developer contact information:** Your email address
5. Click **"Save and Continue"**
6. On the **Scopes** page, click **"Add or Remove Scopes"**
7. Select these scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
8. Click **"Update"** then **"Save and Continue"**
9. On the **Test users** page:
   - Click **"Add Users"**
   - Add your Google email address (and any other test users)
   - Click **"Add"** then **"Save and Continue"**
10. Review the summary and click **"Back to Dashboard"**

---

## Step 4: Create OAuth 2.0 Credentials

1. In the navigation menu, go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** at the top
3. Select **"OAuth client ID"**
4. Choose application type: **"Web application"**
5. Enter a name: **"AdventureNest Web Client"**
6. Under **"Authorized JavaScript origins"**, click **"Add URI"**:
   - Add: `http://localhost:3000`
7. Under **"Authorized redirect URIs"**, click **"Add URI"**:
   - Add: `http://localhost:3000/api/auth/callback/google`
8. Click **"Create"**
9. A popup will appear with your credentials:
   - **Client ID** - Copy this value
   - **Client Secret** - Copy this value
   - **IMPORTANT:** Save these somewhere safe temporarily

---

## Step 5: Update Your .env File

1. Open your `.env` file in the project root
2. Replace the placeholder values:

```bash
# Before (placeholder values)
AUTH_GOOGLE_ID="google_id_here"
AUTH_GOOGLE_SECRET="google_secret_here"

# After (your real values)
AUTH_GOOGLE_ID="1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz"
```

3. Make sure `AUTH_SECRET` is still there (should already be set)
4. Save the file

---

## Step 6: Restart Your Development Server

1. Stop your current dev server (Ctrl+C in terminal)
2. Clear the Next.js cache:
   ```bash
   rm -rf .next
   ```
3. Start the server again:
   ```bash
   npm run dev
   ```
4. The auth error should now be gone from the console

---

## Step 7: Test the Authentication

1. Open your browser and go to http://localhost:3000
2. Try to access a protected page like `/book` or `/account/bookings`
3. You should be redirected to the sign-in page
4. Click **"Sign in with Google"**
5. You'll be redirected to Google's OAuth consent screen
6. Sign in with your Google account (use one of your test users)
7. Grant permissions to the app
8. You should be redirected back to your app and signed in
9. Check if your name/email appears in the header
10. You should now have access to protected routes

---

## Troubleshooting

### Error: "Access blocked: Authorization Error"
**Solution:** Make sure you added your email as a test user in the OAuth consent screen (Step 3, item 9)

### Error: "redirect_uri_mismatch"
**Solution:**
- Check that your redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- No trailing slash
- Make sure "http" not "https" for local development

### Error: "MissingSecret" still appears
**Solution:**
- Verify your .env file has real values (not "google_id_here")
- Make sure you cleared .next cache and restarted server
- Check that .env is in the project root (not in src/)

### User data not saving to database
**Solution:**
- Make sure PostgreSQL is running: `pg_isready -h localhost -p 5432`
- Check that your DATABASE_URL in .env is correct
- Run migrations again: `npx prisma migrate dev`

---

## Production Deployment

When deploying to production (Vercel, etc.):

1. Go back to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 client
3. Add your production URLs:
   - **Authorized JavaScript origins:** `https://yourdomain.com`
   - **Authorized redirect URIs:** `https://yourdomain.com/api/auth/callback/google`
4. Update your production environment variables with the same credentials
5. In OAuth consent screen, publish your app (or keep it in testing mode if you want to limit users)

---

## Security Notes

- Never commit your `.env` file to Git (it's already in .gitignore)
- Never share your Client Secret publicly
- Rotate credentials if they're ever exposed
- Use different OAuth clients for development and production (recommended)
- Keep your Google Cloud Console access secure

---

## What This Enables

Once Google OAuth is working, users can:
- ✅ Sign in with their Google account
- ✅ Create activity bookings
- ✅ View their booking history
- ✅ Create marketplace listings
- ✅ Manage their listings
- ✅ Access protected routes

Admin users (with ADMIN role in database) can:
- ✅ Access admin dashboard
- ✅ Create/edit/delete activities
- ✅ Manage all bookings
- ✅ View user statistics

---

## Next Steps

After authentication is working:
1. Test creating a booking
2. Check if user data appears in database (use Prisma Studio: `npx prisma studio`)
3. Manually update a user's role to ADMIN in the database to test admin features
4. Consider adding more OAuth providers (GitHub, Facebook, etc.)
5. Set up email notifications for bookings

---

**Need Help?** Check the Next-Auth documentation: https://next-auth.js.org/providers/google
