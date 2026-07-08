# 🗺️ Step-by-Step Development Blueprint

To build this salon management app efficiently, we will build from the "inside out." We start by building the Admin dashboard to insert data (Services, Workers), then build the Client facing pages to consume that data, and finally wrap it up with the M-Pesa payments.

---

## Phase 1: Authentication & App Shell

Before anyone can book anything, we need users and a global layout.

- **`app/layout.tsx`:** The global layout. Install your fonts, configure Tailwind, and wrap your app in necessary providers (like a Toast notification provider for success/error messages).

- **`app/page.tsx`:** The platform landing page. This is where a Salon Owner clicks "Sign Up my Salon."

- **`app/(auth)/login/page.tsx`:** Standard login page.

- **`app/(auth)/register/page.tsx`:** Registration form. This form should trigger the Server Action we built earlier (`createSalonAndOwner`).

---

## Phase 2: The Owner Dashboard (Data Ingestion)

The owner needs to be able to set up their salon before clients can book.  
All routes here are protected and verify the user has `role: "OWNER"`.

- **`app/(dashboard)/layout.tsx`:** The dashboard shell. Contains the sidebar navigation (Overview, Bookings, Staff, Services, Products).

- **`app/(dashboard)/dashboard/page.tsx`:** The main analytics hub. Shows today's bookings, total revenue, and active staff.

- **`app/(dashboard)/services/page.tsx`:** A table listing all services. Includes a "Add Service" modal (Name, Duration in mins, Price).

- **`app/(dashboard)/staff/page.tsx`:** Worker management. Here the owner creates `WorkerProfile` records, sets their `commissionPct`, and assigns them an email/password to log in.

- **`app/(dashboard)/products/page.tsx`:** Simple inventory management for retail items (Shampoo, Oils, etc.).

---

## Phase 3: The Worker Portal

Workers need a simplified view to see their schedule and earnings without accessing salon settings.  
All routes here verify the user has `role: "WORKER"`.

- **`app/(worker)/worker-board/page.tsx`:**
  - **View 1:** "Today's Schedule" - A chronological list of clients coming in today.
  - **Action:** A "Mark Completed" button next to an ongoing appointment. Clicking this triggers a Server Action that calculates their commission and updates the DB.

- **`app/(worker)/earnings/page.tsx`:** A ledger showing their accumulated commissions from past completed bookings.

---

## Phase 4: The Client Storefront & Booking Flow

This is where the magic happens. The public booking flow lives directly in the app without tenant subdomain routing.

- **`app/layout.tsx`:** Provides the shared salon branding and global providers.

- **`app/(marketing)/page.tsx`:** The salon's public landing page. Displays a list of their Services and Products. Contains a big "Book Appointment" button.

- **`app/book/service/page.tsx`:**
  - **Step 1:** User selects a Service (e.g., Knotless Braids).

- **`app/book/datetime/page.tsx`:**
  - **Step 2:** User picks a Date.
  - **Crucial Logic:** Your UI fetches available workers for that date using the Scheduling Engine logic we discussed. It displays open time slots. User selects a Time & a Worker.

- **`app/book/checkout/page.tsx`:**
  - **Step 3:** Order summary. The user enters their Safaricom Phone Number and clicks "Pay with M-Pesa."

---

## Phase 5: The Daraja M-Pesa Engine

This ties the client checkout to the real world.

- **`app/actions/mpesaActions.ts`:** A Server Action triggered when the user clicks "Pay with M-Pesa." It creates a `Booking` in the DB as `PENDING_PAYMENT` and calls Safaricom to initiate the STK Push.

- **Supabase Edge Function (`/supabase/functions/mpesa-webhook/index.ts`):**
  - Safaricom sends the success/failure JSON payload here.
  - The function updates the `Booking` status in the database to `CONFIRMED`.

- **`app/book/checkout/success/page.tsx`:** Can show the final confirmed state once payment confirmation is wired in.
