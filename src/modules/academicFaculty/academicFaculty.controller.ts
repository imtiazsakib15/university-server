import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyServices.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully!',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  create,
};
