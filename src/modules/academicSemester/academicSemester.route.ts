import { Router } from 'express';
import { createAcademicSemester } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

export const academicSemesterRoutes = router;
