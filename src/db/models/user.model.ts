import mongoose from 'mongoose';
import { z } from 'zod';

export type UserRole = 'user' | 'admin';
export type UserSchema = z.infer<typeof userSchema>;

export const userSchema = z.object({
  name: z.string().lowercase().min(3).max(255),
  lastname: z.string().lowercase().min(3).max(255),
  email: z.email(),
  password: z.string().min(8).max(255),
  role: z.enum(['user', 'admin']).default('user'),
});

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', schema);

export default User;
