import { Router } from 'express';
import {
  createAcademicSemester,
  getAcademicSemester,
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

router.get('/:semesterId', getAcademicSemester);

export const academicSemesterRoutes = router;
