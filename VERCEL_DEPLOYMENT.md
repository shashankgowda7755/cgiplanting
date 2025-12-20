# Vercel Deployment Guide

## Quick Deployment Steps

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)

2. **Import project in Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your repository

3. **Configure Build Settings:**
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. **Add Environment Variables** (Optional - only if using a database):
   - `DATABASE_URL`: Your PostgreSQL database connection string
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: A random secret string

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

## Important Notes

- The app will use **in-memory storage** by default (data won't persist between deployments)
- For persistent storage, add a `DATABASE_URL` environment variable pointing to a PostgreSQL database
- Recommended: Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech) for database

## Troubleshooting

### 404 Error
If you see a 404 error after deployment:
1. Check the Vercel build logs for errors
2. Verify that `dist/serverless.cjs` was created during build
3. Ensure `vercel.json` routing configuration is correct

### Database Issues
If using a database and getting errors:
1. Verify `DATABASE_URL` is set in Vercel environment variables
2. Run database migrations if needed
3. Check database connection logs in Vercel function logs

## Local Testing

Test the production build locally:
```bash
npm run build
npm start
```

The app should run on port 5000 (or the PORT environment variable).
