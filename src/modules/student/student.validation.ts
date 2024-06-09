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

const studentValidationSchema = z.object({
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
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
