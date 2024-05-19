import express from 'express';
import {
  createStudent,
  getAllStudents,
  getAStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getAStudent);

export const studentRoutes = router;
