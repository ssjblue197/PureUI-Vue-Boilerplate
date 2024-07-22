import type { ROLE, User } from '@/types/user';

export interface Form {
  username?: string;
  email?: string;
  password?: string;
}

export type Actions = {
  login: (payload: Form) => Promise<any>;
  refresh: () => Promise<any>;
  logout: () => void;
  register: (payload: Form) => Promise<any>;
  forgotPassword: (payload: Form) => Promise<any>;
  reset: () => void;
  userRole: () => ROLE | undefined;
  setToken: (token: string) => void;
  setRemember: (payload: {
    remember?: boolean;
    email_login?: string;
  }) => void;
};

export interface State {
  currentUser?: User;
  access_token?: string;
  remember?: boolean;
  email_login?: string;
  enable_2fa?: 0 | 1;
}
