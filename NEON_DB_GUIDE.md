# Neon Database Setup & Editability Guide

Your application is fully configured to work with **Neon Database (PostgreSQL)**. This allows you to edit "everything" (Events/Goals, Categories, Pledges) directly in the database, and the changes will reflect on your live site.

## 1. Confirming Compatibility
Your code (`server/storage.ts` and `server/db.ts`) handles the switch automatically:
- **Local (No Database)**: Uses Memory Storage (resets on restart).
- **Production (With Database)**: Uses Neon Database (persistent & editable).

## 2. How to Edit Events/Goals in Neon
Once your site is connected to Neon:

1.  **Open Neon Console**: Go to your Neon Dashboard.
2.  **Go to Tables**: Find the `goals` table.
3.  **Edit Rows**:
    - **Title/Description**: Change the text directly.
    - **Image**: Paste a new image URL.
    - **Color**: Provide a CSS color string (e.g., `#FF5733` or `bg-red-500`).
    - **Order/Priority**: You can add columns for sorting if needed, or rely on IDs.
4.  **Save**: The changes are saved instantly.
5.  **Refresh Site**: Your website will fetch the new data on the next reload.

## 3. Connecting to Neon (Vercel)
To make your deployed Vercel site use Neon:

1.  **Get Connection String**: Copy the `postgres://...` string from Neon.
2.  **Go to Vercel**: Project Settings -> Environment Variables.
3.  **Add Variable**:
    - Key: `DATABASE_URL`
    - Value: `postgres://...` (your connection string)
4.  **Redeploy**: Go to Deployments -> Redeploy (to ensure the app starts with the new config).

## 4. Connecting Locally (Optional)
Create an `.env` file in the root folder:

```env
DATABASE_URL="postgres://user:pass@ep-xyz.region.neon.tech/neondb?sslmode=require"
```

Restart your local server (`npm run dev`). You should see:
`📦 Storage initialized: Using DatabaseStorage (Neon DB)`

## Summary
**Yes, it is comfortable.** You can edit all your events (Goals) and categories directly in the Neon database table editor without changing any code.
