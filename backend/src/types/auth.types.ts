import type { User } from "../generated/prisma";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  gender: string;
  role: string;
  date_of_birth: string;
}

export interface UserProfile {
  user: User
  token: string,
}

export type UserBasic = Pick<UserProfile, 'id' | 'email'>;


export type UpdateProfileData = {
  name: string,
  gender: string,
  date_of_birth: Date,
  password: string
};
