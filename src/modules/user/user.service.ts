import mongoose from 'mongoose';
import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';

const createStudentIntoDB = async (
  password: string,
  studentInfo: Partial<IStudent>,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userInfo: Partial<IUser> = {
      id: await generateStudentId(studentInfo),
      password: password || (config.DEFAULT_PASSWORD as string),
      role: 'student',
      status: 'in-progress',
    };

    const newUser = await User.create([userInfo], { session });

    if (!newUser[0]) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    studentInfo.user = newUser[0]._id;
    studentInfo.id = newUser[0].id;

    const newStudent = await Student.create([studentInfo], { session });

    if (!newStudent[0]) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createFacultyIntoDB = async (
  password: string,
  facultyInfo: Partial<IFaculty>,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userInfo: Partial<IUser> = {
      id: await generateFacultyId(),
      password: password || config.DEFAULT_PASSWORD,
      role: 'faculty',
      status: 'in-progress',
    };
    const newUser = await User.create([userInfo], { session });

    if (!newUser)
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');

    facultyInfo.user = newUser[0]._id;
    facultyInfo.id = newUser[0].id;

    const newFaculty = await Faculty.create([facultyInfo], { session });

    if (!newFaculty)
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty.');

    await session.commitTransaction();
    await session.endSession();
    return newFaculty[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const UserServices = { createStudentIntoDB, createFacultyIntoDB };
