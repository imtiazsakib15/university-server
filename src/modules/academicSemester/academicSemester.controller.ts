import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { createAcademicSemesterIntoDB } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
  },
);

export { createAcademicSemester };
