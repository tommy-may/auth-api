import type { UserRole } from '#/db/models/user.model';
import { ForbiddenError, UnauthorizedError } from '#/lib/response-errors';
import type { RequestHandler } from 'express';

const userRoleMiddleware =
  (roles: UserRole[]): RequestHandler =>
  (request, _response, next) => {
    try {
      if (!request.user) throw new UnauthorizedError('Authentication Required');
      if (!roles.includes(request.user.role))
        throw new ForbiddenError('Access Denied');

      next();
    } catch (err) {
      next(err);
    }
  };

export default userRoleMiddleware;
