import { env } from '#/config/env';
import type { TokenKey } from '#/utils/jwt';
import type { CookieOptions, Request, Response } from 'express';

type CookieKey = TokenKey;

const SECURE = env.node_env === 'production';

const maxAge = {
  'access-token': 15 * 60 * 1000 /* 15m */,
  'refresh-token': 7 * 24 * 60 * 60 * 1000 /* 7d  */,
};

const getCookieOptions = (key: CookieKey): CookieOptions => ({
  httpOnly: true,
  secure: SECURE,
  sameSite: 'strict',
  maxAge: maxAge[key],
});

export const setCookie = (
  response: Response,
  key: CookieKey,
  value: string,
  options?: CookieOptions
) => {
  response.cookie(key, value, { ...getCookieOptions(key), ...options });
};

export const getCookie = (request: Request, key: CookieKey) =>
  request.cookies[key];

export const clearCookie = (
  response: Response,
  key: CookieKey,
  options?: CookieOptions
) => {
  response.clearCookie(key, { ...getCookieOptions(key), ...options });
};
