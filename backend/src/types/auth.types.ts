import type { User } from '../db/schema';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'email' | 'isActivated' | 'role'> & {
    firstname: string | null;
    lastname: string | null;
  };
};
