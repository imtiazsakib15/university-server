import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student info saved successfully!',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty info saved successfully',
    data: result,
  });
});

export const UserControllers = { createStudent, createFaculty };
