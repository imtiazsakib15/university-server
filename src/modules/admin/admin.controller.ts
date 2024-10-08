import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';
import AppError from '../../errors/AppError';

const getAll = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins info retrieved successfully!',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getByIdFromDB(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Admin not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin info retrieved successfully!',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateByIdIntoDB(id, admin);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Admin not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin info updated successfully!',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin info deleted successfully!',
    data: result,
  });
});

export const AdminControllers = {
  getAll,
  getById,
  updateById,
  deleteById,
};
