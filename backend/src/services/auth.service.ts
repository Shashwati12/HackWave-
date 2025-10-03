import supabase from '../config/supabase.config.ts';
import jwt from 'jsonwebtoken';
import type {
  RegisterData,
  UserProfile,
  UserBasic,
  UpdateProfileData,
} from '../types/auth.types.ts';

import config from '../config/index.ts';

const generateToken = (id: string): string => {
  
  
  return jwt.sign({ id }, config.JWT_SECRET());
};

export const register = async (userData: RegisterData): Promise<UserProfile> => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (authError) throw new Error(authError.message);
  if (!authData?.user) throw new Error('User not created');

  const userId = authData.user.id;

  const { data: user, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        email: userData.email,
        name: userData.name,
        gender: userData.gender,
        role: userData.role,
        date_of_birth: userData.date_of_birth,
       
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return {
    ...user,
    token: generateToken(user.id),
  } as UserProfile;
};

export const login = async (email: string, password: string): Promise<UserProfile> => {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData?.user) {
    throw new Error('Invalid credentials');
  }

  const userId = authData.user.id;

  const { data: userProfile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !userProfile) {
    throw new Error('User profile not found');
  }

  return {
    ...userProfile,
    token: generateToken(userId),
  } as UserProfile;
};

export const getUserIdByEmail = async (email: string): Promise<UserBasic> => {
  const { data, error } = await supabase
    .from('users')
    .select('id, email')
    .eq('email', email)
    .single();

  if (error) throw error;
  return data as UserBasic;
};

export const getProfile = async (userId: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as UserProfile;
};

export const updateProfile = async (
  userId: string,
  updateData: UpdateProfileData
): Promise<UserProfile> => {

  const { data, error } = await supabase
    .from('users')
    .update({
      email: updateData.email,
      name: updateData.name,
      gender: updateData.gender,
      stream: updateData.role,
      date_of_birth: updateData.date_of_birth,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
};
