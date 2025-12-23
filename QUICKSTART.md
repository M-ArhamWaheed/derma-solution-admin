# Quick Start Guide

Get your Derma Solution admin panel up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created (takes ~2 minutes)

### Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire SQL from `SUPABASE_SETUP.md`
4. Paste it into the SQL editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - this is correct!

### Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual Supabase credentials.

## Step 4: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Create Your First Account

1. You'll be redirected to the sign-in page
2. Click "Sign Up"
3. Fill in your details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: (at least 6 characters)
4. Check "I agree to Terms and Conditions"
5. Click "Sign Up"

You'll be signed in as a **customer** and see the dashboard!

## Step 6: Create an Admin Account

To access the admin panel, you need to promote your account to admin:

1. Go to your Supabase dashboard
2. Click **Table Editor** → **profiles**
3. Find your user
4. Click on the row and edit the `role` field from `customer` to `admin`
5. Save the changes
6. Sign out and sign in again

Now when you log in, you'll be redirected to `/admin` instead of `/dashboard`!

## Step 7: Add Sample Data (Optional)

To see the dashboard in action, add some sample data:

### Add Categories

1. Go to **Table Editor** → **categories** in Supabase
2. Click "Insert" → "Insert row"
3. Add categories like:
   - Acne & Scars
   - Pigmentation
   - Volume & Sculpturering
   - Skin Boost

### Add Services

1. Go to **Table Editor** → **services**
2. Add services linked to your categories:
   - Name: "Acne course"
   - Category: (select from dropdown)
   - Price: 2000
   - Description: "Professional acne treatment"
   - is_popular: true
   - is_active: true

## 🎉 You're Done!

Your admin panel is now fully functional. You can:

- **As Customer:** Browse services, see categories, view popular offers
- **As Admin:** Manage categories, services, orders, and view statistics

## Common Issues

### "Invalid API credentials"
- Double-check your `.env.local` file
- Make sure the values are correct (no quotes or spaces)
- Restart the dev server after changing env variables

### "Failed to fetch"
- Make sure your Supabase project is running
- Check if you ran the database schema correctly
- Verify Row Level Security is enabled

### "Not authorized"
- Make sure you ran all the SQL from `SUPABASE_SETUP.md`
- Check if the user role is set correctly in the profiles table
- Try signing out and signing in again

## Next Steps

- Customize the theme in `app/globals.css`
- Add your own images and branding
- Customize the services and categories
- Set up email notifications
- Deploy to production (Vercel recommended)

## Need Help?

Check the full `README.md` for more detailed information about:
- Project structure
- Database schema
- Performance optimizations
- Security features

Happy coding! 🚀

