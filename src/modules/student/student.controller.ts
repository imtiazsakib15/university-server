import { Request, Response } from 'express';
import { createStudentIntoDB, getAllStudentsFromDB } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const result = await createStudentIntoDB(student);

    res.status(201).json({
      success: true,
      message: 'Student info saved successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Student info retrieved successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createStudent, getAllStudent };
