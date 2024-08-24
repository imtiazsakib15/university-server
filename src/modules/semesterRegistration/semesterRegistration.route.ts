import { Router } from 'express';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidationSchemas } from './semesterRegistration.validation';
const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(SemesterRegistrationValidationSchemas.createSchema),
  SemesterRegistrationControllers.create,
);

router.get('/', SemesterRegistrationControllers.getAll);

export const SemesterRegistrationRoutes = router;
