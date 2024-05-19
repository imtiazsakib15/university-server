import express from 'express';
import { createStudent } from './student.controller';

const router = express.Router();

router.post('/create-student', createStudent);

export const studentRoutes = router;
