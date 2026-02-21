import type { RequestHandler } from 'express';
import type { z } from 'zod';

const zodMiddleware =
  (schema: z.ZodType): RequestHandler =>
  async (request, _response, next) => {
    try {
      const parsed = await schema.parseAsync(request.body);
      request.parsedBody = parsed;

      next();
    } catch (err) {
      next(err);
    }
  };

export default zodMiddleware;
