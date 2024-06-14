import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('academicSemester');
  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('academicSemester');
  // const result = await Student.aggregate([
  //   {
  //     $match: { _id: new mongoose.Types.ObjectId(id) },
  //   },
  // ]);
  return result;
};

const updateByIdIntoDB = async (id: string, studentInfo: IStudent) => {
  const result = await Student.findOneAndUpdate({ _id: id }, studentInfo, {
    new: true,
  });
  return result;
};

const deleteByIdFromDB = async (studentId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );

    await session.commitTransaction();
    return { deletedUser, deletedStudent };
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
  } finally {
    await session.endSession();
  }
};

export const StudentServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
