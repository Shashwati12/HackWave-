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
  token: string,
}

export type UserBasic = Pick<UserProfile, 'id' | 'email'>;


export type UpdateProfileData = Partial<Omit<UserProfile, 'id' >>;
