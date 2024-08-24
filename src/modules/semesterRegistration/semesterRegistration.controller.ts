import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const create = catchAsync(async (req, res) => {
  const { semesterRegistration } = req.body;
  const result =
    await SemesterRegistrationServices.createIntoDB(semesterRegistration);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration completed successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester Registration info retrieved successfully!',
    data: result,
  });
});

export const SemesterRegistrationControllers = { create, getAll };
