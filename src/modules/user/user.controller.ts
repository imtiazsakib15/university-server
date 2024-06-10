import { NextFunction, Request, RequestHandler, Response } from 'express';
import { createStudentIntoDB } from './user.service';
import studentValidationSchema from '../student/student.validation';
import { IStudent } from '../student/student.interface';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;

  // Validation using Zod
  const { data: studentInfo, error } =
    studentValidationSchema.safeParse(student);

  if (error) return next(error);

  const result = await createStudentIntoDB(password, studentInfo as IStudent);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student info saved successfully!',
    data: result,
  });
});

export { createStudent };
