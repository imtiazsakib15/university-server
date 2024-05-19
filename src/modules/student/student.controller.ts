import { Request, Response } from 'express';
import { createStudentIntoDB } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  const { student } = req.body;
  const result = await createStudentIntoDB(student);

  res.status(201).json({
    success: true,
    message: 'Student info saved successfully!',
    data: result,
  });
};

export { createStudent };
