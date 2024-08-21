import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationSchemas } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAll);

router.get('/:id', AdminControllers.getById);

router.patch(
  '/:id',
  validateRequest(AdminValidationSchemas.updateSchema),
  AdminControllers.updateById,
);

router.delete('/:id', AdminControllers.deleteById);

export const AdminRoutes = router;
