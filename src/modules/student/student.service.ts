import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFromDB = async (query: Record<string, unknown>) => {
  // filtering using searchTerm
  let searchTerm: string = '';
  if (query?.searchTerm) searchTerm = query.searchTerm as string;

  const searchableFields: string[] = [
    'name.firstName',
    'name.lastName',
    'email',
  ];

  const searchQuery = Student.find({
    $or: searchableFields.map((field: string) => {
      return {
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      };
    }),
  });

  // filtering using fields
  const excludeFields: string[] = [
    'searchTerm',
    'sort',
    'page',
    'limit',
    'fields',
  ];
  const queryObj: Record<string, unknown> = { ...query };
  excludeFields.forEach((field: string) => delete queryObj[field]);

  const filterQuery = searchQuery.find(queryObj);

  // sorting using fields
  let sort = '-createdAt';
  if (query?.sort) sort = query.sort as string;
  const sortQuery = filterQuery.sort(sort);

  // pagination
  let page: number = 1;
  let limit: number = 10;
  if (query?.page) page = Number(query.page) as number;
  if (query?.limit) limit = Number(query.limit) as number;

  const skip: number = (page - 1) * limit;
  const paginateQuery = sortQuery.skip(skip).limit(limit);

  // field limiting
  let fields: string = '';
  if (query?.fields) fields = (query.fields as string).split(',').join(' ');
  const fieldLimitingQuery = paginateQuery.select(fields);

  const result = await fieldLimitingQuery
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
      runValidators: true,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
