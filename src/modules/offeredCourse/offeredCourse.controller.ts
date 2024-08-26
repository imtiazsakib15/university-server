import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const create = catchAsync(async (req, res) => {
  const { offeredCourse } = req.body;
  const result = await OfferedCourseServices.createIntoDB(offeredCourse);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered Course created successfully.',
    data: result,
  });
});

export const OfferedCourseControllers = { create };
