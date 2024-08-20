import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './faculty.constant';
import { IFaculty } from './faculty.interface';
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

export const FacultyServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
};
