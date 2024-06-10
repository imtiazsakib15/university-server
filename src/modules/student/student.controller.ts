import { NextFunction, Request, Response } from 'express';
import {
  getAllStudentsFromDB,
  getAStudentFromDB,
  updateAStudentIntoDB,
  deleteStudentFromDB,
} from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students info retrieved successfully!',
    data: result,
  });
});

const getAStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await getAStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info retrieved successfully!',
    data: result,
  });
});

const updateAStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await updateAStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info updated successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student info deleted successfully!',
    data: result,
  });
});

export { getAllStudents, getAStudent, deleteStudent, updateAStudent };
