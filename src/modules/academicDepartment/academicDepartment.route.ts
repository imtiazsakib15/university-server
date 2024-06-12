import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidationSchemas } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidationSchemas.createSchema),
  AcademicDepartmentControllers.create,
);

router.get('/', AcademicDepartmentControllers.getAll);

router.get('/:departmentId', AcademicDepartmentControllers.getById);

router.patch(
  '/:departmentId',
  validateRequest(AcademicDepartmentValidationSchemas.updateSchema),
  AcademicDepartmentControllers.updateById,
);

export const AcademicDepartmentRoutes = router;
