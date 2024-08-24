import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { SEARCHABLE_FIELDS } from './course.constant';
import { ICourse, ICourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

const updateByIdIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { preRequisiteCourses, ...remainingCourseInfo } = payload;
    let result = await Course.findByIdAndUpdate(id, remainingCourseInfo, {
      new: true,
      runValidators: true,
      session,
    });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong.');
    }

    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      const deletedPreRequisiteCourseIds = preRequisiteCourses
        .filter((course) => course.course && course.isDeleted)
        ?.map((course) => course.course);

      result = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisiteCourseIds },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong.');
      }

      const newPreRequisiteCourses = preRequisiteCourses.filter(
        (course) => course.course && !course.isDeleted,
      );

      result = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisiteCourses,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
    }
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong.');
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      error.message || 'Something went wrong.',
    );
  }
};

const deleteByIdFromDB = async (id: string) => {
  return await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const assignCourseFacultiesIntoDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  return await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      upsert: true,
      new: true,
      runValidators: true,
    },
  );
};

const removeCourseFacultiesFromDB = async (
  id: string,
  payload: Partial<ICourseFaculty>,
) => {
  return await CourseFaculty.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    {
      new: true,
      runValidators: true,
    },
  );
};

export const CourseServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
  assignCourseFacultiesIntoDB,
  removeCourseFacultiesFromDB,
};
