import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidationSchemas } from './offeredCourse.validation';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidationSchemas.createSchema),
  OfferedCourseControllers.create,
);

router.get('/', OfferedCourseControllers.getAll);

router.get('/:id', OfferedCourseControllers.getById);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidationSchemas.updateSchema),
  OfferedCourseControllers.updateById,
);

router.delete('/:id', OfferedCourseControllers.deleteById);

export const OfferedCourseRoutes = router;
