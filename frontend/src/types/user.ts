export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  role: UserRole;
  isActivated: boolean;
  headline: string | null;
  location: string | null;
  about: string | null;
  skills: string[];
  profilePhoto: string | null;
  bannerImage: string | null;
  createdAt: string;
  updatedAt: string;
}

// Minimal user shape returned inside auth/list responses
export type AuthUser = Pick<
  User,
  'id' | 'firstname' | 'lastname' | 'email' | 'isActivated' | 'role' | 'headline' | 'location' | 'profilePhoto'
>;

// Request types
export interface UpdateUserRequest {
  firstname?: string;
  lastname?: string;
  headline?: string;
  location?: string;
  about?: string;
  skills?: string[];
  profilePhoto?: string;
  bannerImage?: string;
}
