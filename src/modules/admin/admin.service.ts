import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './admin.constant';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getAllFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();

  return await adminQuery.modelQuery;
};

const getByIdFromDB = async (id: string) => {
  return await Admin.findById(id);
};

const updateByIdIntoDB = async (id: string, adminInfo: Partial<IAdmin>) => {
  const { name, ...remainingAdminInfo } = adminInfo;
  const modifiedUpdatedInfo: Record<string, unknown> = {
    ...remainingAdminInfo,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedInfo[`name.${key}`] = value;
    }
  }

  return await Admin.findByIdAndUpdate(id, modifiedUpdatedInfo, {
    new: true,
    runValidators: true,
  });
};

const deleteByIdFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    const deletedUser = await User.findByIdAndUpdate(
      { _id: deletedAdmin?.user },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser || !deletedAdmin)
      throw new AppError(httpStatus.NOT_FOUND, 'User or admin not found');

    await session.commitTransaction();
    return { deletedUser, deletedAdmin };
  } catch (error: unknown) {
    await session.abortTransaction();
    if (error instanceof Error)
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
  } finally {
    await session.endSession();
  }
};

export const AdminServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
