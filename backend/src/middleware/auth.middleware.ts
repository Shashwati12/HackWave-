import type { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { AuthRequest, AuthUser } from '../types/auth.types';

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get('authorization');
    let token: string | undefined;

    if (authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);


      if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
        req.user = decoded as AuthUser;
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, token invalid');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
);
