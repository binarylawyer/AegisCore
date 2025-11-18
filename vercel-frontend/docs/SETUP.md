# Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project
- Supabase Storage bucket configured

## Initial Setup

### 1. Install Dependencies

```bash
cd vercel-frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `vercel-frontend` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase Dashboard under Project Settings → API.

### 3. Database Setup

Run the Supabase initialization script to create all required tables:

```bash
# From the project root
psql "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres?sslmode=require" -f aegis-docker/sql/supabase_init.sql
```

This creates the following tables:
- `collector_leads` - Lead candidates from Profiler workflows
- `art_market_events` - Market intelligence events
- `art_movements` - Art movement tracking
- `artworks` - Artwork inventory

### 4. Supabase Storage Setup

1. Go to your Supabase Dashboard → Storage
2. Create a new bucket named `artworks`
3. Set the bucket to **Public** (or configure Row Level Security policies)
4. Configure CORS if needed for your domain

**Bucket Configuration:**
- Name: `artworks`
- Public: Yes (or configure RLS)
- File size limit: Configure as needed (default is 50MB)
- Allowed MIME types: `image/*`, `application/pdf`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Services Setup

The Docker services connect to the same Supabase PostgreSQL instance. Configure environment variables in `aegis-docker/.env`:

```env
POSTGRES_HOST=your-supabase-host
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-supabase-password
POSTGRES_SSLMODE=require
```

Then start the Docker stack:

```bash
cd aegis-docker
docker compose up -d
```

## Features

### Artwork Upload

The upload functionality:
1. Accepts images and PDFs via file input
2. Uploads images to Supabase Storage bucket `artworks`
3. Stores artwork metadata in the `artworks` table
4. Returns public URLs for uploaded images

**Storage Path Format**: `artworks/{timestamp}-{random}.{ext}`

### Inventory Display

The inventory page:
1. Fetches artworks from Supabase `artworks` table
2. Displays uploaded images from `image_urls` array
3. Shows placeholder icon if no images uploaded
4. Filters by status (all, listed, draft, tokenized)

## Troubleshooting

### Images Not Displaying

1. **Check Storage Bucket**: Ensure `artworks` bucket exists and is public
2. **Check Image URLs**: Verify `image_urls` array contains valid Supabase Storage URLs
3. **Check CORS**: If images fail to load, check CORS settings in Supabase Storage
4. **Check Console**: Look for errors in browser console

### Upload Fails

1. **Check Environment Variables**: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. **Check Storage Permissions**: Ensure bucket allows uploads
3. **Check File Size**: Verify file is within size limits
4. **Check Console**: Look for detailed error messages

### Database Errors

1. **Verify Table Exists**: Run `SELECT * FROM artworks LIMIT 1;` in Supabase SQL Editor
2. **Check Schema**: Ensure `supabase_init.sql` was run successfully
3. **Check Permissions**: Verify RLS policies allow inserts/selects

## Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Environment Variables

For production, ensure these are set:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key

**Note**: Never commit `.env.local` files or expose service role keys in the frontend.

