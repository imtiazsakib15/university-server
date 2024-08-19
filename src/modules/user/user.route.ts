import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidationSchemas } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidationSchemas } from '../faculty/faculty.validation';

const router = express.Router();

// student creation route
router.post(
  '/create-student',
  validateRequest(StudentValidationSchemas.createSchema),
  UserControllers.createStudent,
);

// faculty creation route
router.post(
  '/create-faculty',
  validateRequest(FacultyValidationSchemas.createSchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;
