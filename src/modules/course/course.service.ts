import { ICourse } from './course.interface';
import { Course } from './course.model';

const createIntoDB = async (payload: ICourse) => {
  return await Course.create(payload);
};

export const CourseServices = { createIntoDB };
