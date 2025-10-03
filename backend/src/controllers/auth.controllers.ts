import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as authService from '../services/auth.service.js';
import type { AuthRequest } from '../types/auth.types.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  const user = await authService.login(email, password);
  res.json(user);
});

export const getUserIdByEmail = asyncHandler(async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  if (!email) {
    res.status(400).json({ message: 'Email query parameter is required.' });
    return;
  }

  const user = await authService.getUserIdByEmail(email);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  res.status(200).json(user);
});

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const profile = await authService.getProfile(req.user.id);
  if (!profile) {
    res.status(404).json({ message: 'Profile not found.' });
    return;
  }

  res.status(200).json(profile);
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user?.id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const updatedUser = await authService.updateProfile(req.user.id, req.body);
  console.log(req.body);
  res.status(200).json(updatedUser);
});
