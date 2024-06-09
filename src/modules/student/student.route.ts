import express from 'express';
import {
  getAllStudents,
  getAStudent,
  updateAStudent,
  deleteStudent,
} from './student.controller';

const router = express.Router();

router.get('/', getAllStudents);

router.get('/:id', getAStudent);

router.patch('/:id', updateAStudent);

router.delete('/:id', deleteStudent);

export const studentRoutes = router;
