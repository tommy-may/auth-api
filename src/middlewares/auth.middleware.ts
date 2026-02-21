import { ForbiddenError, UnauthorizedError } from '#/lib/response-errors';
import { getCookie } from '#/utils/cookie';
import { decodeToken } from '#/utils/jwt';
import type { RequestHandler } from 'express';

const authMiddleware: RequestHandler = (request, _response, next) => {
  try {
    const header = request.headers['authorization'];
    const [, token] = (header && header.split(' ')) || [];

    const aToken = getCookie(request, 'access-token');

    if (!token && !aToken)
      throw new UnauthorizedError('Authentication Required');

    const decoded = decodeToken('access-token', aToken || token);
    request.user = decoded;

    next();
  } catch (err) {
    if (err instanceof Error && err.message === 'Token Authentication Failed')
      throw new ForbiddenError('Authentication Failed');

    next(err);
  }
};

export default authMiddleware;
