import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department name must be a string.',
      required_error: 'Academic department name is required.',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty id must be a string.',
      required_error: 'Academic faculty id is required.',
    }),
  }),
});
const updateSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department name must be a string.',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty id must be a string.',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidationSchemas = {
  createSchema,
  updateSchema,
};
