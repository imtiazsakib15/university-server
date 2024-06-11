import { Router } from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidationSchemas } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidationSchemas.createSchema),
  AcademicSemesterControllers.create,
);

router.get('/', AcademicSemesterControllers.get);

router.get('/:semesterId', AcademicSemesterControllers.getById);

router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidationSchemas.updateSchema),
  AcademicSemesterControllers.updateById,
);

export const AcademicSemesterRoutes = router;
