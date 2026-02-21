import { env } from '#/config/env';
import type { UserSchema } from '#/db/models/user.model';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';

export interface TokenPayload {
  id: Types.ObjectId;
  role: UserSchema['role'];
}

export type TokenKey = 'access-token' | 'refresh-token';
export type TokenDecoded = TokenPayload & { extra: string };

export const generateToken = (key: TokenKey, payload: TokenPayload) => {
  const SECRET = env.jwt[key].secret;
  const EXPIRES_IN = env.jwt[key].expires;

  try {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN as never });
  } catch (err) {
    throw new Error('Token Authentication Failed', { cause: err });
  }
};

export const decodeToken = (key: TokenKey, token: string) => {
  const SECRET = env.jwt[key].secret;

  try {
    return jwt.verify(token, SECRET) as TokenDecoded;
  } catch (err) {
    throw new Error('Token Authentication Failed', { cause: err });
  }
};
