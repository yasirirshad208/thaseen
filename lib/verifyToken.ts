// lib/verifyToken.ts
import jwt from 'jsonwebtoken';

interface DecodedToken {
  _id: string;
  email:string;
  isAdmin?: boolean;
}

export function verifyToken(token: string): DecodedToken | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT secret not defined');

  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}