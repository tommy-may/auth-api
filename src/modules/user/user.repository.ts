import type { UserSchema } from '#/db/models/user.model';
import User from '#/db/models/user.model';
import type { Types } from 'mongoose';

const UserRepository = {
  newUser: async (doc: UserSchema) => {
    const user = new User(doc);
    await user.save();

    const { password, ...rest } = user.toObject(); // remove password
    return { ...rest };
  },
  findUsers: async () => {
    const users = await User.find()
      // .where(req.query)
      .select('-password')
      .lean()
      .exec();

    return users;
  },
  findUserById: async (id: Types.ObjectId) => {
    const user = await User.findById(id)
      // .where(req.query)
      .select('-password')
      .lean()
      .exec();

    return user;
  },
  findUserByEmailForAuth: async (email: string) => {
    const user = await User.findOne({ email }).lean().exec();

    return user;
  },
  deleteUserById: async (id: Types.ObjectId) => {
    await User.findByIdAndDelete(id);
  },
};

export default UserRepository;
