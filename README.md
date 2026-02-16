# Booking App – Frontend

This is the frontend application for the Booking App system.

It allows authenticated users to:

- Log in using email and password
- View their personal bookings
- Create new bookings


The frontend communicates with a Node.js + Express backend secured with Supabase authentication and Row-Level Security (RLS).

## Tech Stack

- Next.js (App Router)
- React
- Fetch API
- Supabase (authentication handled via backend)

## Features

- Authentication flow (login + token storage)
- Protected routes
- Automatic root redirect based on authentication state
- Create booking
- View personal bookings
- Cancel own bookings
- JWT-based API requests

## Authentication Flow

1. User logs in via `/login`
2. Backend verifies credentials using Supabase
3. Backend returns an access_token
4. Frontend stores the token in localStorage
5. Token is sent in Authorization header for protected API routes

## Installation

1. Clone the repository

git clone <repo-url>

2. Install dependencies

npm install

3. Run the development server

npm run dev

App runs on:
http://localhost:3000

## Backend

This frontend requires the backend API to be running at:

http://localhost:5000

Backend repository:
https://github.com/Kertich/booking-system

## Project Structure

app/
 ├── page.js          → Root redirect logic
 ├── login/page.js    → Login page
 ├── bookings/page.js → Protected bookings page

## Future Improvements

- Add booking status UI indicators
- Add admin approval workflow
- Improve UI styling
- Implement token expiration handling
- Replace localStorage with secure HTTP-only cookies




