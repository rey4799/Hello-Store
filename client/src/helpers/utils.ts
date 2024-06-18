import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!;


export const verifyToken = async (token: string) => {
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });
    return payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const signToken = (data: Record<string, any>) => {
  return jwt.sign(data, JWT_SECRET)
}
