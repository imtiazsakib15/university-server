import { Request, Response } from 'express';
import { createStudentIntoDB } from './user.service';
import studentValidationSchema from '../student/student.validation';
import { IStudent } from '../student/student.interface';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body;

    // Validation using Zod
    const { data: studentInfo, error } =
      studentValidationSchema.safeParse(student);

    if (error)
      return res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong!',
        error: error,
      });

    const result = await createStudentIntoDB(password, studentInfo as IStudent);

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

export { createStudent };
