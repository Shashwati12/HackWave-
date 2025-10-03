import type {JwtPayload} from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import config from '../config/index'
import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/appError';
import type { AuthRequest } from '../types/auth.types';

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ApiError('not authorized, no token',401)
    }

    const decoded = await jwt.verify(token, config.JWT_SECRET());

    if (!decoded) {
        throw new ApiError('Invalid token or token expired',401)
    }

    req.user = (decoded as JwtPayload).user;
    next();

};