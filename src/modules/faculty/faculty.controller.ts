import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';
import AppError from '../../errors/AppError';

const getAll = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties info retrieved successfully!',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getByIdFromDB(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty info retrieved successfully!',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateByIdIntoDB(id, faculty);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty info updated successfully!',
    data: result,
  });
});

export const FacultyControllers = {
  getAll,
  getById,
  updateById,
};
