import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidationSchemas } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidationSchemas.createSchema),
  AcademicFacultyControllers.create,
);

export const AcademicFacultyRoutes = router;
