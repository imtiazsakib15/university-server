import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

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

export const CourseControllers = { create, getAll };
