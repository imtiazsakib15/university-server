import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const create = catchAsync(async (req, res) => {
  const { course } = req.body;
  const result = await CourseServices.createIntoDB(course);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All courses info retrieved successfully!',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getByIdFromDB(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Course not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course info retrieved successfully!',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteByIdFromDB(id);

  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Course not found.');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully!',
    data: result,
  });
});

export const CourseControllers = { create, getAll, getById, deleteById };
