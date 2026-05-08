# TilesGallery

A modern tiles gallery built with Next.js and Better Auth. Browse curated tiles, view details, and manage your profile with email/password and Google sign-in.

## Features

- Tile catalog with featured items and detail pages
- Email/password authentication and Google OAuth (Better Auth)
- Profile view and update flow
- Responsive UI built with HeroUI and Tailwind
- Animated UI accents with animate.css

## Tech Stack

- Next.js (App Router)
- React
- Better Auth + MongoDB adapter
- Tailwind CSS + HeroUI

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - start production server
- `npm run lint` - run ESLint

## Project Structure

```
src/
	app/               # App Router pages and layouts
	components/        # Shared UI components
	lib/               # Auth client and server configuration
public/
	data/tiles.json    # Tile catalog data
```

## Authentication Notes

- Google OAuth must be configured in your Google Cloud project.
- Ensure the callback URL matches your Better Auth setup.
- Update `NEXT_PUBLIC_BETTER_AUTH_URL` for production.


