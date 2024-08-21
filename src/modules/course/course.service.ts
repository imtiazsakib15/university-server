import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './course.constant';
import { ICourse } from './course.interface';
import { Course } from './course.model';

const createIntoDB = async (payload: ICourse) => {
  return await Course.create(payload);
};
const getAllFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate({
      path: 'preRequisiteCourses.course',
    }),
    query,
  )
    .search(SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();

  const result = await courseQuery.modelQuery;
  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await Course.findById(id).populate({
    path: 'preRequisiteCourses.course',
  });

  return result;
};

export const CourseServices = { createIntoDB, getAllFromDB, getByIdFromDB };
