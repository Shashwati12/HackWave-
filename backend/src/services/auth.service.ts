import supabase from '../config/supabase.config.ts';
import jwt from 'jsonwebtoken';
import type {
  RegisterData,
  UserProfile,
  UserBasic,
  UpdateProfileData,
} from '../types/auth.types.ts';
import bcrypt from 'bcrypt'
import {prisma} from '../config/prisma.config.ts';
import config from '../config/index.ts';
import { password } from 'bun';
import { ApiError } from '../utils/appError.ts';
import type { User } from '../generated/prisma/index';

const generateToken = (id: number): string => {
  return jwt.sign({ id }, config.JWT_SECRET());
};

export const register = async (userData: RegisterData): Promise<> => {

  const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        role: userData.role,
        date_of_birth: new Date(userData.date_of_birth),
        password: hashedPassword
      }
    });
  return {
    user: user,
  }
}

export const login = async (email: string, password: string): Promise<UserProfile> => {

  try {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError('Invalid credentials');
  }
  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
   return {
    ...user,
    token: generateToken(user.id),
  };
}catch(e) {
  console.log(e);
}
};

export const getUserIdByEmail = async (email: string): Promise<UserBasic> => {
  return await prisma.user.findFirst({
    where: {
      email
    },
  })
};

export const getProfile = async (userId: number): Promise<UserProfile> => {
  return await prisma.user.findFirst({
    where: {
      id: userId
    },
  })
};

export const updateProfile = async (
  userId: number,
  payload: UpdateProfileData
): any => {

  try {
  const { name, ...rest } = payload;

  const dataToUpdate = Object.fromEntries(
    Object.entries({ name, ...rest }).filter(([_, v]) => v !== undefined)
  );

  if (JSON.stringify(dataToUpdate) === "{}") throw new ApiError("No fields passed", 400);

  if(dataToUpdate.password) {
    const hashedPassword = await bcrypt.hash(dataToUpdate.password, 10);
    dataToUpdate.password = hashedPassword;
  }
  if(dataToUpdate.date_of_birth) {
    dataToUpdate.date_of_birth = new Date(dataToUpdate.date_of_birth);
  }
  const update =  await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
  });

  return prisma.user.findFirst({
    where: {
      id: userId
    }
  })
}catch(e) {
  console.log(e);
}
};
