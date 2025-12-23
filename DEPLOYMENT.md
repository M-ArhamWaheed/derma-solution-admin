# Deployment Guide

This guide will help you deploy your Derma Solution admin panel to production.

## Recommended Platform: Vercel

Vercel is the easiest and recommended platform for deploying Next.js applications.

### Deploy to Vercel

#### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (~2-3 minutes)
   - Your site will be live at `your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables when prompted
```

### Auto Deployments

Once connected to Git, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Show deployment status in GitHub

## Alternative Platforms

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Railway will auto-deploy

### Deploy to Your Own Server

#### Prerequisites
- Node.js 18+ installed
- PM2 or similar process manager

```bash
# On your server
git clone your-repo-url
cd adminpanel

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "adminpanel" -- start
pm2 save
pm2 startup
```

## Environment Variables

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

## Production Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set correctly
- [ ] Database schema is applied in Supabase
- [ ] Row Level Security policies are enabled
- [ ] Admin user is created
- [ ] Test authentication flow
- [ ] Test admin panel access
- [ ] Test customer dashboard
- [ ] Error pages are customized
- [ ] SEO metadata is updated
- [ ] Analytics are configured (optional)
- [ ] Custom domain is configured (optional)

## Performance Optimization

### Enable Caching

In `next.config.ts`, add:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add these for better performance
  compress: true,
  poweredByHeader: false,
};
```

### Database Indexes

Make sure these indexes exist in Supabase (already included in schema):

- `idx_services_category_id`
- `idx_services_is_popular`
- `idx_orders_customer_id`
- `idx_orders_service_id`
- `idx_orders_status`
- `idx_orders_created_at`

### Image Optimization

- Use Next.js Image component (already implemented)
- Store images in Supabase Storage or CDN
- Optimize images before upload

## Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to Project → Analytics
2. Enable Web Analytics
3. View real-time metrics

### Supabase Monitoring

Monitor your database:
1. Go to Supabase → Database
2. Check Table Editor for data
3. Monitor RLS policies
4. Check Auth logs

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local`
   - Use platform's environment variable management

2. **Database Security**
   - Row Level Security enabled ✅
   - Secure API keys (anon key is safe for client)
   - Admin access properly restricted ✅

3. **Authentication**
   - Email verification (configure in Supabase Auth)
   - Password requirements (minimum 6 chars, configurable)
   - Rate limiting (built into Supabase)

4. **HTTPS**
   - Automatically enabled on Vercel/Netlify
   - Required for production

## Backup Strategy

### Database Backups

Supabase provides automatic daily backups on paid plans.

Manual backup:
1. Go to Database → Backups
2. Click "Create backup"
3. Download when needed

### Code Backups

- Use Git for version control
- Keep main branch stable
- Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`

## Scaling

### Database
- Supabase scales automatically on paid plans
- Consider upgrading plan when reaching limits

### Application
- Vercel scales automatically
- No configuration needed for most use cases

### CDN
- Vercel provides global CDN out of the box
- Assets are automatically cached

## Troubleshooting Production Issues

### Build Fails
- Check Node.js version matches local
- Verify all dependencies are in `package.json`
- Check build logs for errors

### Database Connection Issues
- Verify environment variables are set
- Check Supabase project status
- Verify RLS policies are correct

### Slow Performance
- Check database indexes
- Enable caching in Next.js
- Optimize images
- Use Suspense boundaries

### Authentication Issues
- Clear browser cookies
- Check Supabase Auth logs
- Verify redirect URLs in Supabase settings

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Supabase logs
3. Review Next.js documentation
4. Check GitHub issues for known problems

## Post-Deployment

After successful deployment:
1. Test all features thoroughly
2. Set up monitoring
3. Configure alerts
4. Document any customizations
5. Train admin users
6. Monitor initial usage

Congratulations! Your application is now live! 🎉

