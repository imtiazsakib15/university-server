import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get('/', AdminControllers.getAll);

router.get('/:id', AdminControllers.getById);

export const AdminRoutes = router;
