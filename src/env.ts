import { z } from "zod";

const ENV_SCHEMA = z.object({
  DATABASE_URL: z.string().url().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  SERVER_BASE_URL: z.string().url().min(1),
});

const env = ENV_SCHEMA.parse(process.env);

export default env;
