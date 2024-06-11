import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
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
      message: 'All academic semesters retrieved successfully!',
      data: allAcademicSemesters,
    });
  },
);

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params;
  const academicSemester = await getAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrieved successfully!',
    data: academicSemester,
  });
});

export { createAcademicSemester, getAllAcademicSemesters, getAcademicSemester };
