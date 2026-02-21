import { BadRequestError } from '#/lib/response-errors';
import UserRepository from '#/modules/user/user.repository';
import { comparePassword } from '#/utils/bcrypt';
import { decodeToken, generateToken } from '#/utils/jwt';

const AuthService = {
  authenticateUser: async (email: string, plainPassword: string) => {
    const user = await UserRepository.findUserByEmailForAuth(email);
    if (user == null) throw new BadRequestError('Invalid Credentials');

    if (!(await comparePassword(plainPassword, user.password)))
      throw new BadRequestError('Invalid Credentials');

    const token = generateToken('access-token', {
      id: user._id,
      role: user.role,
    });
    const refreshToken = generateToken('refresh-token', {
      id: user._id,
      role: user.role,
    });

    const { password, ...rest } = user; // remove password

    return { user: { ...rest }, token, refreshToken };
  },
  getTokenByRefreshToken: (rToken: string) => {
    const decoded = decodeToken('refresh-token', rToken);
    const token = generateToken('access-token', {
      id: decoded.id,
      role: decoded.role,
    });

    return token;
  },
};

export default AuthService;
