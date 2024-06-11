import { Router } from 'express';
import {
  createAcademicSemester,
  getAllAcademicSemesters,
} from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

router.get('/', getAllAcademicSemesters);

export const academicSemesterRoutes = router;
