import bc from 'bcrypt';

const SALT = 10;

export const hashPassword = async (password: string) => {
  return await bc.hash(password, SALT);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bc.compare(plainPassword, hashedPassword);
};
