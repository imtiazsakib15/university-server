import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAll = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students info retrieved successfully!',
    data: result,
  });
});

const getById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info retrieved successfully!',
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateByIdIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info updated successfully!',
    data: result,
  });
});

const deleteById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteByIdFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info deleted successfully!',
    data: result,
  });
});

export const StudentControllers = {
  getAll,
  getById,
  deleteById,
  updateById,
};
