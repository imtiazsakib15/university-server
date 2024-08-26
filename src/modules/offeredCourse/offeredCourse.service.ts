import { AcademicFaculty } from './../academicFaculty/academicFaculty.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // check if semester registration is available
  const requestedSemesterRegistration =
    await SemesterRegistration.findById(semesterRegistration);
  if (!requestedSemesterRegistration)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found!',
    );

  // check if academic faculty is available
  const requestedAcademicFaculty =
    await AcademicFaculty.findById(academicFaculty);
  if (!requestedAcademicFaculty)
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found!');

  // check if academic department is available
  const requestedAcademicDepartment =
    await AcademicDepartment.findById(academicDepartment);
  if (!requestedAcademicDepartment)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found!',
    );

  // check if course is available
  const requestedCourse = await Course.findById(course);
  if (!requestedCourse)
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found!');

  // check if faculty is available
  const requestedFaculty = await Faculty.findById(faculty);
  if (!requestedFaculty)
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!');

  const academicSemester = requestedSemesterRegistration.academicSemester;
  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

export const OfferedCourseServices = { createIntoDB };
