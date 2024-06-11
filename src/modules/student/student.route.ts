import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAll);

router.get('/:id', StudentControllers.getById);

router.patch('/:id', StudentControllers.updateById);

router.delete('/:id', StudentControllers.deleteById);

export const StudentRoutes = router;
