import express from 'express';
import { createStudent } from './user.controller';
import { StudentValidationSchemas } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidationSchemas.createSchema),
  createStudent,
);

export const UserRoutes = router;
