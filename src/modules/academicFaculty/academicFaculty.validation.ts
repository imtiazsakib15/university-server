import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be a string.',
    }),
  }),
});
const updateSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty name must be a string.',
    }),
  }),
});

export const AcademicFacultyValidationSchemas = { createSchema, updateSchema };
