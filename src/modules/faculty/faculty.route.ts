import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyControllers.getAll);

router.get('/:id', FacultyControllers.getById);

export const FacultyRoutes = router;
