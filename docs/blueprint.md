# Salon SaaS Platform: Architecture & Design Document

## 1. Executive Summary

This project is salon management software designed for a single salon in the Kenyan market. It handles client bookings, worker schedules, service commissions, and product sales, culminating in an automated M-Pesa STK push integration.

---

## 2. Tech Stack Overview

- **Frontend/Backend:** Next.js (App Router, Server Actions)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma 7 (with `@prisma/adapter-pg` driver)
- **Styling:** Tailwind CSS + Shadcn UI
- **Serverless Functions:** Supabase Edge Functions (for Daraja Webhooks)

---

## 3. Database Architecture

### Core Entities

- **Salon:** The root business profile. Contains branding, contact details, and links operational records.
- **User:** Central identity. A user can be a `CLIENT`, `WORKER`, or `OWNER`.
- **WorkerProfile:** Extends the `User` model for staff, containing their commission rates and availability.
- **Service & Product:** Catalog items managed by the salon.
- **Booking:** The transactional core. Links a `Client`, `Worker`, `Service`, and tracks time and M-Pesa payment status.

---

## 4. Crucial Database Configuration (Prisma 7)

Because we are using Prisma 7 and Supabase, we utilize a dual-connection setup. Teammates must understand this to avoid connection pool exhaustion:

- **The Connection Pooler (`DATABASE_URL` / Port 6543):** Used by the Next.js application at runtime. It routes through PgBouncer to safely handle thousands of rapid API requests from clients without overwhelming the Postgres instance.

- **The Direct Connection (`DIRECT_URL` / Port 5432):** Configured in `prisma.config.ts`. Used strictly by the Prisma CLI (`npx prisma db push` or `migrate`) to alter the database structure, which cannot be done through a pooler.

- **The Singleton:** Inside Next.js (`lib/prisma.ts`), we instantiate Prisma using the `@prisma/adapter-pg` driver to manage connections effectively in serverless environments.

---

## 5. Core System Workflows

### A. The Booking & Scheduling Engine

When a client selects a service and time, the system must prevent "double-booking" a worker.

1. **Logic:** The system queries for active bookings on that date. A slot is deemed available if there is no existing booking that overlaps with the requested `startTime` and calculated `endTime` (Start Time + Service Duration).
2. **Execution:** Final slot assignments are wrapped in a `prisma.$transaction` to guarantee atomicity.

### B. M-Pesa STK Push Integration (Daraja API)

Safaricom's webhooks require fast acknowledgment and can be unpredictable. We handle this using an asynchronous webhook pattern:

1. **Trigger:** Next.js creates a `Booking` record with `status: 'PENDING_PAYMENT'`.
2. **Push:** Our backend calls the Daraja API to trigger the STK push to the user's phone, passing our Supabase Edge Function URL as the callback.
3. **Callback:** When the user enters their PIN, Safaricom posts the result to our Supabase Edge Function.
4. **Confirmation:** The Edge Function securely updates the database record to `status: 'CONFIRMED'`.

### C. Worker Commission Ledger

When a worker finishes a service, an owner or the worker clicks "Complete Appointment":

1. This triggers a Server Action that changes the booking status to `COMPLETED`.
2. The system dynamically calculates the payout (`Service Price * Worker Commission %`) and writes a record to the `EarnedCommission` ledger.

---

## 6. Development Workflow Rules

- **Server Actions First:** Do not build REST APIs (`/api/...`) unless strictly required for external webhooks. Use Next.js Server Actions for all UI-to-Database communication.
- **Validate Everything:** All inputs from the frontend must be validated using Zod before touching the Prisma client.
- **Never Expose STK Passkeys:** All Daraja credentials must remain securely in the `.env` file and must only be accessed on the server-side.
