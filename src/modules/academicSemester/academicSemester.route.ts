import { Router } from 'express';
import {
  createAcademicSemester,
  getAcademicSemester,
  getAllAcademicSemesters,
  updateAcademicSemester,
} from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

router.get('/', getAllAcademicSemesters);

router.get('/:semesterId', getAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(updateAcademicSemesterValidationSchema),
  updateAcademicSemester,
);

export const academicSemesterRoutes = router;
