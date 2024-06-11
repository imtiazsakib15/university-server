import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterServices.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic semester created successfully!',
    data: result,
  });
});

const get = catchAsync(async (req: Request, res: Response) => {
  const allAcademicSemesters = await AcademicSemesterServices.getFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters retrieved successfully!',
    data: allAcademicSemesters,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params;
  const academicSemester =
    await AcademicSemesterServices.getByIdFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrieved successfully!',
    data: academicSemester,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { semesterId } = req.params;
  const academicSemester = req.body;
  const result = await AcademicSemesterServices.updateByIdIntoDB(
    semesterId,
    academicSemester,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully!',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  create,
  get,
  getById,
  updateById,
};
