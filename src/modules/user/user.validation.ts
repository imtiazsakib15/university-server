import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(20, { message: 'Password must be less than 20 characters' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .optional(),
});

export { userValidationSchema };
