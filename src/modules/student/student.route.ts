import express from 'express';
import {
  createStudent,
  getAllStudents,
  getAStudent,
  updateAStudent,
  deleteStudent,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);

router.get('/', getAllStudents);

router.get('/:id', getAStudent);

router.patch('/:id', updateAStudent);

router.delete('/:id', deleteStudent);

export const studentRoutes = router;
