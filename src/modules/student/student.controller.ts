import { Request, Response } from 'express';
import {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteStudentFromDB,
} from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // Validation using Zod
    const { data: studentInfo, error } =
      studentValidationSchema.safeParse(student);

    // Validation using Joi
    // const { error, value: studentInfo } =
    //   studentValidationSchema.validate(student);

    if (error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong!',
        error: error,
      });

    const result = await createStudentIntoDB(studentInfo);

    res.status(201).json({
      success: true,
      message: 'Student info saved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'All students info retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

const getAStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getAStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student info retrieved successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
    });
  }
};

export { createStudent, getAllStudents, getAStudent, deleteStudent };
