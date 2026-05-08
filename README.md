# TilesGallery

A modern tiles gallery built with Next.js and Better Auth. Browse curated tiles, view details, and manage your profile with email/password and Google sign-in.

## UI Requirements

### 1) Layout & Navigation

- Header (Navbar)
  - Left: Website logo (navigates to Home).
  - Center: Links for Home, All Tiles, and My Profile.
  - Right:
    - If logged out: a Login button.
    - If logged in: a link to User Profile and a Logout button.
- Footer
  - Custom footer with social media links and a Contact Us section.

### 2) Home Page

- Banner: Large heading "Discover Your Perfect Aesthetic" with a "Browse Now" button to the All Tiles page.
- Marquee: Scrolling line showing "New Arrivals: [Tile Name] | Weekly Feature: Modern Geometric Patterns | Join the Community..."
- Featured Tiles: Show top 4 tiles fetched from the server, each with a "View Details" button.

### 3) Authentication

Where users can land on Login:

- Navbar Login button (when logged out).
- Direct route: `/login`.
- Link from the Register page.
- Any protected route redirect (e.g., `/my-profile` or `/tile/[id]`).

User Login

- Show a Login page with title and a form with fields: Email, Password, Login button.
- On successful login: navigate to Home page.
- On failure: show an error message (toast or inline form message).
- Provide a link to Register.
- Provide a Google social login button; on success navigate to Home page.

User Registration

- Show a Register page with title and a form with fields: Name, Email, Photo URL (link), Password, Register button.
- On successful registration: navigate to Login page.
- On failure: show an error message (toast or inline form message).
- Provide a link to Login.
- Provide a Google social login button; on success navigate to Home page.

Note: Do not implement email verification or forget password in this submission.

### 4) All Tiles Page (The Gallery)

- Search bar: Large Hero UI input at the top to search tiles by title.
- Tile cards display: thumbnail, title, and a Details button that navigates to Tile Details.

### 5) Single Tile Details Page

- Layout: Large high-res preview on the left and text/details on the right.
- Info: Title, Creator, Style Description, Tags (e.g., "Minimalist", "Blue").

## Technical Requirements

- Framework: Next.js (App Router).
- UI Library: DaisyUI/HeroUI or any comfortable UI library.
- Authentication: Better Auth (MongoDB adapter).

## Other Requirements

- Show a loader while data is fetching.
- Implement a Not Found page.
- Implement a proxy on login or registration.

## Challenge Requirements

1) My Profile

- Create a My Profile page to show logged-in user data.
- Add an update feature for name and image URL.

2) Update Information Feature

- In `/my-profile`, include an Update button.
- On click, route to a new page with a form containing two inputs: Image URL and Name.
- Provide an Update Information button.
- Follow Better Auth docs: https://better-auth.com/docs/concepts/users-accounts#update-user

3) Library Integration

- Implement one of: Animate.css, React-Spring, SwiperJS (React).

## Route Permissions Summary

- Public: `/`, `/all-tiles`, `/login`, `/register`.
- Private: `/tile/[id]`, `/my-profile`.

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


