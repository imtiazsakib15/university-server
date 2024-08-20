import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: 'academicDepartment',
      populate: 'academicFaculty',
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

export const FacultyServices = {
  getAllFromDB,
};
