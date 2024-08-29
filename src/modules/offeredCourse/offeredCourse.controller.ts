import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const create = catchAsync(async (req, res) => {
  const { offeredCourse } = req.body;
  const result = await OfferedCourseServices.createIntoDB(offeredCourse);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered Course created successfully.',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Courses retrieved successfully.',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course retrieved successfully.',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { offeredCourse } = req.body;
  const result = await OfferedCourseServices.updateByIdIntoDB(
    id,
    offeredCourse,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course updated successfully.',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course deleted successfully.',
    data: result,
  });
});

export const OfferedCourseControllers = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
