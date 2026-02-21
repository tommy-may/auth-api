import type { ErrorResBody } from '#/types/response';
import { log } from '#/utils/logger';
import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const errorMiddleware: ErrorRequestHandler<unknown, ErrorResBody> = (
  err,
  _request,
  response,
  next
) => {
  const body = {
    statusCode: err.statusCode || 500,
    name: err.name || 'ServerError',
    message: err.message || 'Internal Server Error',
    err: err.data || null,
  };

  /* zod */

  // default
  if (err instanceof ZodError) {
    body.statusCode = 400;
    body.message = err.message;
    body.err = err.issues;
  }

  /* mongoose */

  // Duplicate Key
  if (err.code === 11000) {
    body.statusCode = 409;
    body.name = 'DatabaseError';
    body.message = err.message;
    body.err = err.keyValue;
  }

  // Cast Error (ObjectId)
  if (err.name === 'CastError') {
    body.statusCode = 400;
    body.name = 'DatabaseError';
    body.message = err.message;
    body.err = err.reason;
  }

  if (body.statusCode === 500) {
    log.error(body.message, body.err);
  }

  return response.status(body.statusCode).json({
    success: false,
    name: body.name,
    message: body.message,
    err: body.err,
  });

  next();
};

export default errorMiddleware;
