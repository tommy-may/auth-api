import type { TokenDecoded } from '#/utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: TokenDecoded;
      parsedBody?: unknown;
    }
  }
}

export {};
