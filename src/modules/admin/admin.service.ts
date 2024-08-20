import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './admin.constant';
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

export const AdminServices = {
  getAllFromDB,
};
