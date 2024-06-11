import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
} from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicSemesterIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const allAcademicSemesters = await getAllAcademicSemestersFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester retrieved successfully!',
      data: allAcademicSemesters,
    });
  },
);

export { createAcademicSemester, getAllAcademicSemesters };
