import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // We MUST pass the DIRECT_URL here because the CLI cannot use the pooler (port 6543)
    url: env("DIRECT_URL"), 
  },
});