import { z } from 'zod';
import { SEMESTER_REGISTRATION_STATUS } from './semesterRegistration.constant';

const createSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string({
        required_error: 'Academic semester ID is required.',
      }),
      status: z.enum(SEMESTER_REGISTRATION_STATUS as [string, ...string[]]),
      startDate: z.string({ required_error: 'Start date is required.' }),
      endDate: z.string({ required_error: 'End date is required.' }),
      minCredit: z
        .number({ required_error: 'Minimum credit is required.' })
        .min(1, { message: 'Minimum credit must be at least 1.' }),
      maxCredit: z
        .number({ required_error: 'Maximum credit is required.' })
        .min(15, { message: 'Maximum credit must be at least 15.' }),
    }),
  }),
});

const updateSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string().optional(),
      status: z
        .enum(SEMESTER_REGISTRATION_STATUS as [string, ...string[]])
        .optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      minCredit: z
        .number()
        .min(1, { message: 'Minimum credit must be at least 1.' })
        .optional(),
      maxCredit: z
        .number()
        .max(15, { message: 'Maximum credit must be at most 15.' })
        .optional(),
    }),
  }),
});

export const SemesterRegistrationValidationSchemas = {
  createSchema,
  updateSchema,
};
