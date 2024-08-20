import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './faculty.constant';
import { Faculty } from './faculty.model';

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

export const FacultyServices = {
  getAllFromDB,
  getByIdFromDB,
};
