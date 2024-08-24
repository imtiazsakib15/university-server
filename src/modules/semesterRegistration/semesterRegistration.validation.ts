import { z } from 'zod';
import { SEMESTER_REGISTRATION_STATUS } from './semesterRegistration.constant';

const createSchema = z.object({
  body: z.object({
    semesterRegistration: z.object({
      academicSemester: z.string({
        required_error: 'Academic semester ID is required.',
      }),
      status: z.enum(SEMESTER_REGISTRATION_STATUS as [string, ...string[]]),
      startDate: z.date({ required_error: 'Start date is required.' }),
      endDate: z.date({ required_error: 'End date is required.' }),
      minCredit: z
        .number({ required_error: 'Minimum credit is required.' })
        .min(1, { message: 'Minimum credit must be at least 1.' }),
      maxCredit: z
        .number({ required_error: 'Maximum credit is required.' })
        .min(15, { message: 'Maximum credit must be at least 15.' }),
    }),
  }),
});

export const SemesterRegistrationSchemas = { createSchema };
