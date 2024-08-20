import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getAllFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

const updateByIdIntoDB = async (id: string, facultyInfo: Partial<IFaculty>) => {
  const { name, ...remainingFacultyInfo } = facultyInfo;
  const modifiedUpdatedInfo: Record<string, unknown> = {
    ...remainingFacultyInfo,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedInfo[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedInfo, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteByIdFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    const deletedUser = await User.findByIdAndUpdate(
      { _id: deletedFaculty?.user },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser || !deletedFaculty)
      throw new AppError(httpStatus.NOT_FOUND, 'User or faculty not found');

    await session.commitTransaction();
    return { deletedUser, deletedFaculty };
  } catch (error: unknown) {
    await session.abortTransaction();
    if (error instanceof Error)
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
  } finally {
    await session.endSession();
  }
};

export const FacultyServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
