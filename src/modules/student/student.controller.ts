import { NextFunction, Request, Response } from 'express';
import {
  getAllStudentsFromDB,
  getAStudentFromDB,
  updateAStudentIntoDB,
  deleteStudentFromDB,
} from './student.service';
import studentValidationSchema from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllStudentsFromDB();

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
      success: true,
      message: 'Student updated successfully!',
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

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllStudents, getAStudent, deleteStudent, updateAStudent };
