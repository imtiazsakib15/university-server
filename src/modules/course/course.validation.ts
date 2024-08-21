import { AnyZodObject, z } from 'zod';

const createPreRequisiteCourseSchema: AnyZodObject = z.object({
  course: z.string({ required_error: 'Course ID is required.' }),
  isDeleted: z.boolean().default(false),
});

const createSchema: AnyZodObject = z.object({
  body: z.object({
    course: z.object({
      title: z
        .string({ required_error: 'Course title is required.' })
        .min(1, 'Course title cannot be empty.')
        .trim(),
      prefix: z
        .string({ required_error: 'Course prefix is required.' })
        .min(1, 'Course prefix cannot be empty.')
        .trim(),
      code: z
        .number({ required_error: 'Course code is required.' })
        .positive('Course code must be a positive number.')
        .int('Course code must be an integer.'),
      credit: z
        .number({ required_error: 'Course credit is required.' })
        .positive('Course credit must be a positive number.')
        .int('Course credit must be an integer.'),
      preRequisiteCourse: z.array(createPreRequisiteCourseSchema).optional(),
    }),
  }),
});

export const CourseSchemas = { createSchema };
