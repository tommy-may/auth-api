import { ForbiddenError, NotAcceptableError } from '#/lib/response-errors';
import AuthService from '#/modules/auth/auth.service';
import type { AuthSchema } from '#/schemas/auth.schema';
import type { ResBody } from '#/types/response';
import { clearCookie, getCookie, setCookie } from '#/utils/cookie';
import type { RequestHandler } from 'express';

export const login: RequestHandler<unknown, ResBody> = async (
  request,
  response,
  next
) => {
  try {
    const parsedBody = request.parsedBody as AuthSchema;
    const { user, token, refreshToken } = await AuthService.authenticateUser(
      parsedBody.email,
      parsedBody.password
    );

    setCookie(response, 'access-token', token);
    setCookie(response, 'refresh-token', refreshToken);

    response.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler<unknown, ResBody> = (
  _request,
  response,
  next
) => {
  try {
    clearCookie(response, 'access-token');
    clearCookie(response, 'refresh-token');

    response.status(200).json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
};

export const refreshToken: RequestHandler = (request, response, next) => {
  try {
    const rToken = getCookie(request, 'refresh-token');
    if (!rToken) throw new NotAcceptableError('Authentication Expired');

    const token = AuthService.getTokenByRefreshToken(rToken);

    setCookie(response, 'access-token', token);

    response.status(200).json({ success: true, data: { token } });
  } catch (err) {
    if (err instanceof Error && err.message === 'Token Authentication Failed')
      throw new ForbiddenError('Authentication Failed');

    next(err);
  }
};
