import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;

const optional = <T extends z.core.SomeType>(schema: T) =>
  z.preprocess((val) => (val === '' ? undefined : val), schema);

const toNumber = <T extends z.core.SomeType>(schema: T) =>
  z.preprocess((val) => (val === '' ? undefined : Number(val)), schema);

export const envSchema = z.object({
  NODE_ENV: optional(
    z.enum(['development', 'production']).default('development')
  ),

  // Logger
  LOG_LEVEL: optional(
    z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info')
  ),
  LOG_DIR: optional(z.string().default(`${import.meta.dirname}/../..`)),

  // Server
  PORT: toNumber(z.number().min(0).max(65535).default(3000)),
  HOST: optional(z.string().default('0.0.0.0')),

  // Database
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),

  // JWT
  JWT_SECRET: z.string().min(10).max(255),
  JWT_REFRESH_SECRET: z.string().min(10).max(255),
  JWT_EXPIRES_IN: optional(
    z
      .string()
      .regex(/^\d+(s|m|h|d)$/)
      .default('15m')
  ), // accept {0}s | {0}m | {0}h | {0}d
  JWT_REFRESH_EXPIRES_IN: optional(
    z
      .string()
      .regex(/^\d+(s|m|h|d)$/)
      .default('7d')
  ), // accept {0}s | {0}m | {0}h | {0}d
});
