import { userSchema } from '#/db/models/user.model';
import authMiddleware from '#/middlewares/auth.middleware';
import userRoleMiddleware from '#/middlewares/user-role.middleware';
import zodMiddleware from '#/middlewares/zod.middleware';
import {
  createUser,
  deleteUser,
  getMe,
  getUser,
  getUsers,
} from '#/modules/user/user.controller';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', zodMiddleware(userSchema), createUser);

userRouter.get('/', authMiddleware, userRoleMiddleware(['admin']), getUsers);
userRouter.get('/me', authMiddleware, getMe);
userRouter.get(
  '/:id',
  authMiddleware,
  userRoleMiddleware(['admin']),
  getUser as never
);

userRouter.delete(
  '/:id',
  authMiddleware,
  userRoleMiddleware(['admin']),
  deleteUser as never
);

export default userRouter;
