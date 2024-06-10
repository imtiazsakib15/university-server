import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
});

const guardianValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
  occupation: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
  contactNo: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password must be less than 20 characters' })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
      .optional(),

    student: z.object({
      name: userNameValidationSchema.required(),
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().date().optional(),
      email: z.string().email(),
      contactNo: z.string().regex(/^[0-9]+$/),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(50, { message: 'First name must be at most 50 characters long' }),
      permanentAddress: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(50, { message: 'First name must be at most 50 characters long' }),
      guardian: guardianValidationSchema.required(),
      profileImg: z.string().url().optional(),
    }),
  }),
});

export { createStudentValidationSchema };
