# Derma Solution - Admin Panel

A production-ready booking service admin panel built with Next.js 16, TypeScript, Supabase, and shadcn/ui.

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Database & Auth:** Supabase
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS 4
- **Fonts:** Poppins (headings), Inter (body text)
- **State Management:** React Server Components + Client Components
- **Date Formatting:** date-fns

## 📁 Project Structure

```
adminpanel/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/
│   └── admin/
│       ├── categories/
│       ├── services/
│       ├── orders/
│       └── emails/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Authentication forms
│   ├── layout/          # Layout components (Navbar, Footer, Sidebar)
│   ├── dashboard/       # Customer dashboard components
│   └── admin/           # Admin panel components
├── lib/
│   ├── supabase/        # Supabase client & queries
│   └── utils.ts         # Utility functions
├── types/
│   └── database.ts      # TypeScript types
└── hooks/
    └── use-toast.ts     # Toast hook
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### 1. Clone and Install

```bash
cd adminpanel
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `SUPABASE_SETUP.md` in your Supabase SQL Editor
3. Copy your project URL and anon key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication & Roles

The application supports role-based authentication with two roles:

- **Customer:** Access to `/dashboard`
- **Admin:** Access to `/admin` panel

### Creating an Admin User

1. Sign up a new user through the UI
2. Run this SQL in Supabase to promote them to admin:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

## 🎨 Features

### Customer Dashboard (`/dashboard`)

1. **Hero Section** - Welcome message and branding
2. **Category Quick Links** - Scroll navigation to categories
3. **Popular Services** - Top 3 featured services (horizontal slider)
4. **Categories Section** - All services organized by category
5. **Promo Section** - Clinic information and CTA
6. **Reviews Section** - Customer testimonials
7. **Footer** - Contact information and links

### Admin Panel (`/admin`)

1. **Dashboard** - Stats cards and recent orders
2. **Categories** - Manage service categories
3. **Services** - Manage treatment services
4. **Orders** - View and manage customer bookings
5. **Emails** - Email management (placeholder)

## 🛡️ Security

- Row Level Security (RLS) enabled on all tables
- Customers can only access their own data
- Admins have full access to all data
- Middleware protects routes based on authentication and role
- Server Components handle sensitive data
- Client Components only used when necessary

## 🎯 Performance Optimizations

- Server Components by default
- React.memo for frequently rendered components
- Optimized database queries with joins
- Suspense boundaries for progressive loading
- Loading skeletons for better UX
- Image optimization with Next.js Image component

## 🌗 Theme Support

The application supports dark and light modes:
- Theme toggle in navbar
- Persisted preference
- System theme detection
- Smooth transitions

## 📊 Database Schema

Key tables:
- `profiles` - User information and roles
- `categories` - Service categories
- `services` - Treatment services
- `orders` - Customer bookings
- `reviews` - Customer reviews

See `SUPABASE_SETUP.md` for complete schema.

## 🧪 Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📝 Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 🤝 Contributing

This is a production-ready template. Feel free to customize it for your needs.

## 📄 License

MIT

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- shadcn for the beautiful UI components
- Tailwind CSS for the utility-first CSS framework
