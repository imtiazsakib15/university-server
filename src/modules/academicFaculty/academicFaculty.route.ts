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

router.get('/', AcademicFacultyControllers.getAll);

router.get('/:facultyId', AcademicFacultyControllers.getById);

router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidationSchemas.updateSchema),
  AcademicFacultyControllers.updateById,
);

export const AcademicFacultyRoutes = router;
