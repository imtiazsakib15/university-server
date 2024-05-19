import express from 'express';
import { createStudent, getAllStudent } from './student.controller';

const router = express.Router();

router.get('/all', getAllStudent);

router.post('/create-student', createStudent);

export const studentRoutes = router;
