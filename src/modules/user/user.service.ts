import type { UserSchema } from '#/db/models/user.model';
import { NotFoundError } from '#/lib/response-errors';
import UserRepository from '#/modules/user/user.repository';
import { hashPassword } from '#/utils/bcrypt';
import type { Types } from 'mongoose';

const UserService = {
  createUser: async (body: UserSchema) => {
    const hashedPassword = await hashPassword(body.password);
    const user = await UserRepository.newUser({
      ...body,
      password: hashedPassword,
    });

    return user;
  },
  getUser: async (id: Types.ObjectId, url: string) => {
    const user = await UserRepository.findUserById(id);
    if (user == null) throw new NotFoundError('User Not Found', url);

    return user;
  },
  deleteUser: async (id: Types.ObjectId, url: string) => {
    const user = await UserRepository.findUserById(id);
    if (user == null) throw new NotFoundError('User Not Found', url);

    await UserRepository.deleteUserById(id);
  },
};

export default UserService;
