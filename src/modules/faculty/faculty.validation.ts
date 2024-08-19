import { z } from 'zod';

const createUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please provide the first name.' })
    .trim(),
  lastName: z
    .string()
    .min(1, { message: 'Please provide the last name.' })
    .trim(),
});

const createSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password must be less than 20 characters' })
      .optional(),
    faculty: z.object({
      user: z.string().min(1, { message: 'Please provide the user id.' }),
      name: createUserNameSchema.required(),
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Please provide a valid email address.' }),
      designation: z
        .string()
        .min(1, { message: 'Please provide a designation.' }),
      contactNo: z
        .string()
        .min(1, { message: 'Please provide a contact number.' }),
      presentAddress: z
        .string()
        .min(1, { message: 'Please provide the present address.' })
        .trim(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Please provide the permanent address.' })
        .trim(),
      profileImg: z.string().optional(),
      academicFaculty: z
        .string()
        .min(1, { message: 'Please provide the academic faculty.' }),
      academicDepartment: z
        .string()
        .min(1, { message: 'Please provide the academic department.' }),
    }),
  }),
});

const updateUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Please provide the first name.' })
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Please provide the last name.' })
    .trim()
    .optional(),
});

const updateSchema = z.object({
  body: z.object({
    user: z
      .string()
      .min(1, { message: 'Please provide the user id.' })
      .optional(),
    name: updateUserNameSchema.optional(),
    gender: z.enum(['male', 'female']).optional(),
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Please provide a valid email address.' })
      .optional(),
    designation: z
      .string()
      .min(1, { message: 'Please provide a designation.' })
      .optional(),
    contactNo: z
      .string()
      .min(1, { message: 'Please provide a contact number.' })
      .optional(),
    presentAddress: z
      .string()
      .min(1, { message: 'Please provide the present address.' })
      .trim()
      .optional(),
    permanentAddress: z
      .string()
      .min(1, { message: 'Please provide the permanent address.' })
      .trim()
      .optional(),
    profileImg: z.string().optional(),
    academicFaculty: z
      .string()
      .min(1, { message: 'Please provide the academic faculty.' })
      .optional(),
    academicDepartment: z
      .string()
      .min(1, { message: 'Please provide the academic department.' })
      .optional(),
  }),
});

export const FacultyValidationSchemas = {
  createSchema,
  updateSchema,
};
