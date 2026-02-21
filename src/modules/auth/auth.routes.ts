import zodMiddleware from '#/middlewares/zod.middleware';
import { login, logout, refreshToken } from '#/modules/auth/auth.controller';
import { authSchema } from '#/schemas/auth.schema';
import type { ErrorResBody } from '#/types/response';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';

const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1m
  max: 5,
  message: {
    success: false,
    name: 'RateLimitError',
    message: 'Too Many Requests',
    err: null,
  } as ErrorResBody,
});

authRouter.use(authLimiter);

authRouter.post('/register', (_request, response) => {
  response.redirect(307, '/v1/users');
});
authRouter.post('/login', zodMiddleware(authSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
