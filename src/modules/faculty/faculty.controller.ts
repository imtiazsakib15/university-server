import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAll = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faculties info retrieved successfully!',
    data: result,
  });
});
export const FacultyControllers = {
  getAll,
};
