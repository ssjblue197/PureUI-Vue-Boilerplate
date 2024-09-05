import { z } from 'zod';

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

export interface Form {
  username?: string;
  email?: string;
  password?: string;
  address?: {
    country?: string;
    city?: string;
  };
}

// Define your form schema using Zod
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'Username is required',
    })
    .nullable(),
  password: z.string().min(6).nullable(),
});
