import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

function hasExpectedDelegates(client: PrismaClient | undefined) {
  if (!client) {
    return false;
  }

  const candidate = client as PrismaClient & {
    order?: unknown;
    orderItem?: unknown;
    product?: unknown;
    booking?: unknown;
  };

  return Boolean(candidate.order && candidate.orderItem && candidate.product && candidate.booking);
}

function getPool() {
  if (!globalForPrisma.prismaPool) {
    globalForPrisma.prismaPool = new Pool({
      connectionString,
    });
  }

  return globalForPrisma.prismaPool;
}

function createClient() {
  const adapter = new PrismaPg(getPool());
  const enableQueryLogging = process.env.PRISMA_LOG_QUERIES === "true";

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? enableQueryLogging
          ? ["query", "warn", "error"]
          : ["warn", "error"]
        : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  if (!hasExpectedDelegates(globalForPrisma.prisma)) {
    globalForPrisma.prisma = createClient();
  }

  return globalForPrisma.prisma as PrismaClient;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrismaClient(), prop, receiver);
  },
}) as PrismaClient;
