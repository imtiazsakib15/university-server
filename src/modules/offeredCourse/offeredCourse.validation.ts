import { AnyZodObject, z } from 'zod';
import { DAYS } from './offeredCourse.constant';

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)');

const createSchema: AnyZodObject = z.object({
  body: z.object({
    offeredCourse: z
      .object({
        semesterRegistration: z.string({
          message: 'Please provide a valid semester registration ID.',
        }),
        academicSemester: z.string().optional(),
        academicFaculty: z.string({
          message: 'Please provide a valid academic faculty ID.',
        }),
        academicDepartment: z.string({
          message: 'Please provide a valid academic department ID.',
        }),
        course: z.string({
          message: 'Please provide a valid course ID.',
        }),
        faculty: z.string({
          message: 'Please provide a valid faculty ID.',
        }),
        maxCapacity: z
          .number({
            required_error: 'Please provide the maximum capacity.',
          })
          .min(1, 'Maximum capacity must be at least 1.'),
        section: z
          .number({
            required_error: 'Please provide the section number.',
          })
          .min(1, 'Section number must be at least 1.'),
        days: z.array(z.enum(DAYS as [string, ...string[]]), {
          required_error: 'Please provide the days.',
        }),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
      })
      .refine((data) => data.startTime < data.endTime, {
        message: 'End time must be after start time',
        path: ['endTime'],
      }),
  }),
});

const updateSchema: AnyZodObject = z.object({
  body: z.object({
    offeredCourse: z
      .object({
        faculty: z.string(),
        maxCapacity: z.number().min(1, 'Maximum capacity must be at least 1.'),
        days: z.array(z.enum(DAYS as [string, ...string[]])),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
      })
      .refine((data) => data?.startTime < data?.endTime, {
        message: 'End time must be after start time',
        path: ['endTime'],
      }),
  }),
});

export const OfferedCourseValidationSchemas = {
  createSchema,
  updateSchema,
};
