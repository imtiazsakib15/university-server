import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAll = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All admins info retrieved successfully!',
    data: result,
  });
});

export const AdminControllers = {
  getAll,
};
