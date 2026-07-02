Phase 2: Connecting Next.js to Prisma 7

Follow these steps in your local VS Code terminal to finalize the connection between your app and the database.

Step 1: Install Database Drivers

Prisma 7 requires explicitly installing the PostgreSQL driver adapter. Run this command in your terminal:

npm install @prisma/adapter-pg pg
npm install -D @types/pg

Step 2: Generate the Client

Now that your database structure exists in Supabase, we need to generate the TypeScript types for your code to use.

npx prisma generate

Step 3: Create the Prisma Singleton

In Next.js development mode, hot-reloading can accidentally spawn hundreds of database connections and crash your app. We prevent this by creating a "Singleton" client.

Create a new folder at the root of your project (or inside src/ if you chose that during setup) called lib.

Inside lib, create a file named prisma.ts.

Paste the following Prisma 7 compliant code:

// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// We use the pooler URL for the Next.js application to handle high traffic
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize the pg driver pool
const pool = new Pool({ connectionString });

// Initialize the Prisma adapter
const adapter = new PrismaPg(pool);

// Attach Prisma to the global object in development to prevent connection exhaustion
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

Step 4: Create your first Server Action

Let's test the database by creating a server action that registers a new Salon and its Owner simultaneously.

Create a new folder called actions inside your app directory.

Create a file named salonActions.ts and paste this code:

// app/actions/salonActions.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createSalonAndOwner(formData: FormData) {
  const salonName = formData.get('salonName') as string;
  const ownerName = formData.get('ownerName') as string;
  const ownerEmail = formData.get('ownerEmail') as string;

  try {
    // Nested write: Creates the Salon AND the User (Owner) in one atomic transaction
    const newSalon = await prisma.salon.create({
      data: {
        name: salonName,
        subdomain: salonName.toLowerCase().replace(/\s+/g, ''),
        users: {
          create: {
            email: ownerEmail,
            name: ownerName,
            phone: '254700000000', // Mock phone
            password: 'hashed_password_placeholder', // You'll hash this later with bcrypt
            role: 'OWNER',
          }
        }
      },
      include: {
        users: true, // Return the created user with the salon
      }
    });

    console.log('Successfully created:', newSalon);
    revalidatePath('/'); // Refresh the page to show new data
    
    return { success: true, data: newSalon };
  } catch (error) {
    console.error('Failed to create salon:', error);
    return { success: false, error: 'Failed to create salon' };
  }
}

Step 5: Test it on the UI

Finally, let's trigger this action from your frontend. Replace the contents of your app/page.tsx with this basic test form:

// app/page.tsx
import { createSalonAndOwner } from './actions/salonActions';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  // Fetch existing salons directly from the DB
  const salons = await prisma.salon.findMany({
    include: { users: true }
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Salon SaaS Platform</h1>
        
        {/* Test Form */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Register New Salon</h2>
          <form action={createSalonAndOwner} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Salon Name</label>
              <input type="text" name="salonName" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Owner Name</label>
              <input type="text" name="ownerName" required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Owner Email</label>
              <input type="email" name="ownerEmail" required className="w-full border p-2 rounded" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Create Salon
            </button>
          </form>
        </section>

        {/* Display Data */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Database Records</h2>
          <div className="space-y-4">
            {salons.length === 0 ? (
              <p className="text-gray-500">No salons in the database yet.</p>
            ) : (
              salons.map((salon) => (
                <div key={salon.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg">{salon.name}</h3>
                  <p className="text-sm text-gray-500">Subdomain: {salon.subdomain}</p>
                  <div className="mt-2 text-sm">
                    <strong>Owner:</strong> {salon.users[0]?.name} ({salon.users[0]?.email})
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}