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

export const SemesterRegistrationControllers = { create };
