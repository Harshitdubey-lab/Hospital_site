# CityCare Hospital Management System

A modern, responsive full-stack Hospital Management Website and Admin Panel built with Next.js, standard CSS modules, and MongoDB.

## Features

**Public Website:**
- Responsive Home Page with premium aesthetics (Medical theme: Blue, White, Green)
- Find a Doctor (Search & Filter by Department)
- Department Listings
- Appointment Booking Form
- Services and Health Packages

**Admin Panel:**
- Secure Admin Login
- Admin Dashboard with Quick Statistics
- Management for Doctors, Departments, and Appointments (Expandable)

## Tech Stack
- **Frontend & Backend:** Next.js (App Router)
- **Styling:** Vanilla CSS Modules (`.module.css`) with global variables
- **Database:** MongoDB with Mongoose
- **Authentication:** Custom JWT via HTTP-only Cookies
- **Icons:** Lucide React

## Setup Instructions

1. **Install Dependencies**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Environment Variables**
   The `.env.local` file is already created for you. Make sure MongoDB is running locally.
   ```
   MONGODB_URI=mongodb://localhost:27017/hospital_db
   JWT_SECRET=super_secret_hospital_jwt_key_2026
   ```

3. **Database Seeding**
   To populate the database with a Super Admin, sample doctors, departments, and services, run the seed script.
   *(Note: Ensure your MongoDB server is running on `localhost:27017` before executing this script.)*
   ```bash
   node seed.js
   ```

4. **Run the Application**
   Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Default Admin Credentials (from Seed)
- **Email:** admin@hospital.com
- **Password:** admin123

Access the admin panel at `http://localhost:3000/admin/login`

## Folder Structure
- `src/app/(public)` - The public-facing website pages and layout.
- `src/app/(admin)` - The protected admin dashboard layout and pages.
- `src/app/api` - Next.js Route Handlers (Backend API).
- `src/components/layout` - Shared UI components (Navbar, Footer).
- `src/models` - Mongoose database schemas.
- `src/lib` - Utility functions (Database connection).
