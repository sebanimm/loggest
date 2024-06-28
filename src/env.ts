import { z } from "zod";

const ENV_SCHEMA = z.object({
  POSTGRES_URL: z.string().url().min(1),
  POSTGRES_PRISMA_URL: z.string().url().min(1),
  POSTGRES_URL_NO_SSL: z.string().url().min(1),
  POSTGRES_URL_NON_POOLING: z.string().url().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_DATABASE: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
  SERVER_BASE_URL: z.string().url().min(1),
  DEFAULT_IMG: z.string().url().min(1),
});

ENV_SCHEMA.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof ENV_SCHEMA> {}
  }
}
