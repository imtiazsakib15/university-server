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

const updateByIdIntoDB = async (
  studentId: string,
  studentInfo: Partial<IStudent>,
) => {
  const { name, guardian, ...remainingStudentInfo } = studentInfo;
  const modifiedUpdatedInfo: Record<string, unknown> = {
    ...remainingStudentInfo,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedInfo[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedInfo[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedUpdatedInfo,
    {
      new: true,
    },
  );
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
