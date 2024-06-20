import { z } from "zod";

const ENV_SCHEMA = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  SERVER_BASE_URL: z.string().url(),
});

const env = ENV_SCHEMA.parse(process.env);

export default env;
