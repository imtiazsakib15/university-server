import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const academicFaculty = req.body;
  const result = await AcademicFacultyServices.createIntoDB(academicFaculty);

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
  const academicFaculty =
    await AcademicFacultyServices.getByIdFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrieved successfully!',
    data: academicFaculty,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const academicFaculty = req.body;
  const result = await AcademicFacultyServices.updateByIdIntoDB(
    facultyId,
    academicFaculty,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully!',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  create,
  getAll,
  getById,
  updateById,
};
