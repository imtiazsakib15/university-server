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

router.get('/:id', CourseControllers.getById);

router.patch(
  '/:id',
  validateRequest(CourseValidationSchemas.updateSchema),
  CourseControllers.updateById,
);

router.delete('/:id', CourseControllers.deleteById);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidationSchemas.courseFacultySchema),
  CourseControllers.assignCourseFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidationSchemas.courseFacultySchema),
  CourseControllers.removeCourseFaculties,
);

export const CourseRoutes = router;
