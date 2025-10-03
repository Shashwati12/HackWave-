import  type { Request } from 'express';

export interface AuthUser {
  id: string;
  [key: string]: any;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}


export interface RegisterData {
  email: string;
  password: string;
  name: string;
  gender: string;
  role: string;
  date_of_birth: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  gender: string;
  role: string;
  date_of_birth: string;
}

export interface UserBasic {
  id: string;
  email: string;
}

export interface UpdateProfileData {
  email?: string;
  name?: string;
  gender?: string;
  stream?: string;
  date_of_birth?: string;
  passing_out_year?: number;
}
