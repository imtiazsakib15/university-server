import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentServices.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic department created successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const allAcademicDepartments =
    await AcademicDepartmentServices.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic departments retrieved successfully!',
    data: allAcademicDepartments,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { departmentId } = req.params;
  const academicDepartment =
    await AcademicDepartmentServices.getByIdFromDB(departmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieved successfully!',
    data: academicDepartment,
  });
});

export const AcademicDepartmentControllers = {
  create,
  getAll,
  getById,
};
