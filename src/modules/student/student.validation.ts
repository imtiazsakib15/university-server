import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
  lastName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' }),
});

const createGuardianValidationSchema = z.object({
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

const createSchema = z.object({
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
      name: createUserNameValidationSchema.required(),
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
      guardian: createGuardianValidationSchema.required(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string(),
      academicSemester: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' })
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' })
    .optional(),
  occupation: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .max(20, { message: 'First name must be at most 20 characters long' })
    .optional(),
  contactNo: z.string().optional(),
});

const updateSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().date().optional(),
      email: z.string().email().optional(),
      contactNo: z
        .string()
        .regex(/^[0-9]+$/)
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(50, { message: 'First name must be at most 50 characters long' })
        .optional(),
      permanentAddress: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(50, { message: 'First name must be at most 50 characters long' })
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string().optional(),
      academicSemester: z.string().optional(),
    }),
  }),
});

export const StudentValidationSchemas = { createSchema, updateSchema };
