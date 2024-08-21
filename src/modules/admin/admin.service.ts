import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './admin.constant';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

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

export const AdminServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
};
