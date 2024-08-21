import { Router } from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidationSchemas } from './course.validation';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidationSchemas.createSchema),
  CourseControllers.create,
);

router.get('/', CourseControllers.getAll);

export const CourseRoutes = router;
