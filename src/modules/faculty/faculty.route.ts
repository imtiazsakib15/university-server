import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidationSchemas } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAll);

router.get('/:id', FacultyControllers.getById);

router.patch(
  '/:id',
  validateRequest(FacultyValidationSchemas.updateSchema),
  FacultyControllers.updateById,
);

router.delete('/:id', FacultyControllers.deleteById);

export const FacultyRoutes = router;
