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
  port: parsed.data.PORT,
  host: parsed.data.HOST,
  db: {
    user: parsed.data.DB_USER,
    password: parsed.data.DB_PASSWORD,
    host: parsed.data.DB_HOST,
    port: parsed.data.DB_PORT,
    name: parsed.data.DB_NAME,
  },
  jwt: {
    'access-token': {
      secret: parsed.data.JWT_SECRET,
      expires: parsed.data.JWT_EXPIRES_IN,
    },
    'refresh-token': {
      secret: parsed.data.JWT_REFRESH_SECRET,
      expires: parsed.data.JWT_REFRESH_EXPIRES_IN,
    },
  },
};
