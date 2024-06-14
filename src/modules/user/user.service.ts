import mongoose from 'mongoose';
import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, studentInfo: IStudent) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userInfo: Partial<IUser> = {
      id: await generateStudentId(studentInfo),
      password: password || (config.default_password as string),
      role: 'student',
      status: 'in-progress',
    };

    const newUser = await User.create([userInfo], { session });
    console.log({ newUser });
    if (!newUser[0]) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    studentInfo.user = newUser[0]._id;
    studentInfo.id = newUser[0].id;

    const newStudent = await Student.create([studentInfo], { session });
    console.log({ newStudent });
    if (!newStudent[0]) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
  }
};

export { createStudentIntoDB };
