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
}

const MAX_FILE_SIZE = 5000000;
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (fileType === 'docx' || fileType === 'pdf')
      return true;
  }
  return false;
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
  // file: z
  //   .any()
  //   .refine(
  //     (file: File) => file?.length !== 0,
  //     'File is required',
  //   )
  //   .refine(
  //     (file) => file.size < MAX_FILE_SIZE,
  //     'Max size is 5MB.',
  //   )
  //   .refine(
  //     (file) => checkFileType(file),
  //     'Only .pdf, .docx formats are supported.',
  //   ),
});
