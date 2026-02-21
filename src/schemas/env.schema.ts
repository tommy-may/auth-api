import { z } from 'zod';

export type Env = z.infer<typeof envSchema>;

const optional = <T extends z.core.SomeType>(schema: T) =>
  z.preprocess((val) => (val === '' ? undefined : val), schema);

export const envSchema = z.object({
  NODE_ENV: optional(
    z.enum(['development', 'production']).default('development')
  ),

  // Logger
  LOG_LEVEL: optional(
    z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info')
  ),
  LOG_DIR: optional(z.string().default(`${import.meta.dirname}/../..`)),
});
