import { NextFunction, Request, Response } from 'express';
import {
  getAllStudentsFromDB,
  getAStudentFromDB,
  updateAStudentIntoDB,
  deleteStudentFromDB,
} from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All students info retrieved successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await getAStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student info retrieved successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { student } = req.body;
    const result = await updateAStudentIntoDB(id, student);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student info updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await deleteStudentFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student info deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllStudents, getAStudent, deleteStudent, updateAStudent };
