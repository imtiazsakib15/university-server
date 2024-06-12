import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyServices.createIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic faculty created successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const allAcademicFaculties = await AcademicFacultyServices.getAllFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic faculties retrieved successfully!',
    data: allAcademicFaculties,
  });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const allAcademicFaculties =
    await AcademicFacultyServices.getByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrieved successfully!',
    data: allAcademicFaculties,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const academicFaculty = await AcademicFacultyServices.updateByIdIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully!',
    data: academicFaculty,
  });
});

export const AcademicFacultyControllers = {
  create,
  getAll,
  getById,
  updateById,
};
