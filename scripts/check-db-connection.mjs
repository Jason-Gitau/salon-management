import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

try {
  await prisma.$connect();
  const salonCount = await prisma.salon.count();
  console.log(`Database connection successful. Salons in database: ${salonCount}`);
} catch (error) {
  console.error("Database connection failed.");
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await pool.end();
}
