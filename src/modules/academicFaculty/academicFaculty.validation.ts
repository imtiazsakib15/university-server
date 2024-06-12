import { z } from 'zod';

const createSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty name must be a string.',
  }),
});

export const AcademicFacultyValidationSchemas = { createSchema };
