import mongodb from '#/db/mongodb';
import authRouter from '#/modules/auth/auth.routes';
import userRouter from '#/modules/user/user.routes';
import type { ResBody } from '#/types/response';
import { type Response, Router } from 'express';

const router = Router();

router.get('/health', (_request, response: Response<ResBody>) => {
  response.status(200).json({
    success: true,
    data: {
      db: {
        status: mongodb.getStatus(),
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

router.use('/v1/auth', authRouter);
router.use('/v1/users', userRouter);

export default router;
