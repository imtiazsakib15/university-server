import { AcademicFaculty } from './../academicFaculty/academicFaculty.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { IOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Types } from 'mongoose';

const createIntoDB = async (payload: IOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
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

  // check if the department belongs to the academic faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The academic department '${requestedAcademicDepartment.name}' does not belong to the academic faculty '${requestedAcademicFaculty.name}'!`,
    );

  // check if any offer course exist with same semester registration, course and section
  const isSectionAlreadyExist = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });
  if (isSectionAlreadyExist)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This section is already exists!',
    );

  const academicSemester = requestedSemesterRegistration.academicSemester;
  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

export const OfferedCourseServices = { createIntoDB };
