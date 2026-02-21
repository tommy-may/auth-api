import type { Env } from '#/schemas/env.schema';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      npm_package_name: string;
    }
  }
}

export {};
