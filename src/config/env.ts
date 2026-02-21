import { envSchema } from '#/schemas/env.schema';
import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = {
  development: '.env',
  production: '.env.production',
};

dotenv.config({ path: envFile[NODE_ENV], quiet: true });

const parsed = envSchema.safeParse({ ...process.env });

if (!parsed.success) {
  console.error('env', parsed.error.issues);
  process.exit(1);
}

export const env = {
  node_env: parsed.data.NODE_ENV,
  log: {
    level: parsed.data.LOG_LEVEL,
    dir: parsed.data.LOG_DIR,
  },
};
