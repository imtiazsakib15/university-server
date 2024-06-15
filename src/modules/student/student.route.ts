import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidationSchemas } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAll);

router.get('/:id', StudentControllers.getById);

router.patch(
  '/:studentId',
  validateRequest(StudentValidationSchemas.updateSchema),
  StudentControllers.updateById,
);

router.delete('/:studentId', StudentControllers.deleteById);

export const StudentRoutes = router;
