import { z } from 'zod';
import {
  ACADEMIC_SEMESTER_CODE,
  ACADEMIC_SEMESTER_NAME,
  MONTHS,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(ACADEMIC_SEMESTER_NAME as [string, ...string[]]),
    code: z.enum(ACADEMIC_SEMESTER_CODE as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum(MONTHS as [string, ...string[]]),
    endMonth: z.enum(MONTHS as [string, ...string[]]),
  }),
});

export { createAcademicSemesterValidationSchema };
