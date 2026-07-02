import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Non-pooled connection: used by the CLI (generate/migrate), which needs
    // direct DDL access. The app itself connects via the pooled DATABASE_URL
    // through the driver adapter in lib/prisma.ts.
    url: env("DIRECT_URL"),
  },
});
