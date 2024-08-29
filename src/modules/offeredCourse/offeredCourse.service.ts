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
import { hasTimeConflict } from './offeredCourse.utils';

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

  // check if the faculty already have a schedule at the same time
  const assignedSchedules = await OfferedCourse.aggregate([
    {
      $match: {
        semesterRegistration: new Types.ObjectId(semesterRegistration),
        course: new Types.ObjectId(course),
        faculty: new Types.ObjectId(faculty),
      },
    },
    {
      $unwind: { path: '$days' },
    },
    {
      $match: { days: { $in: days } },
    },
    { $project: { days: 1, startTime: 1, endTime: 1 } },
  ]);

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  hasTimeConflict(assignedSchedules, newSchedule);

  const academicSemester = requestedSemesterRegistration.academicSemester;
  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
  return result;
};

const getAllFromDB = async () => {
  return await OfferedCourse.find();
};

const updateByIdIntoDB = async (
  id: string,
  payload: Pick<
    IOfferedCourse,
    'faculty' | 'maxCapacity' | 'days' | 'startTime' | 'endTime'
  >,
) => {
  // check if the requested offered course is available
  const requestedOfferedCourse = await OfferedCourse.findById(id);
  if (!requestedOfferedCourse)
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found!');

  // check if the requested semester registration status is 'UPCOMING'
  const requestedSemesterRegistration = await SemesterRegistration.findById({
    _id: requestedOfferedCourse.semesterRegistration,
  });
  if (requestedSemesterRegistration?.status !== 'UPCOMING')
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Can't update this offered course. Because semester is ${requestedSemesterRegistration?.status}`,
    );

  // check if the requested course faculty is available
  const requestedCourseFaculty = await Faculty.findById({
    _id: payload.faculty,
  });
  if (!requestedCourseFaculty)
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found!');

  // check if the faculty already have a schedule at the same time
  const assignedSchedules = await OfferedCourse.aggregate([
    {
      $match: {
        semesterRegistration: new Types.ObjectId(
          requestedOfferedCourse.semesterRegistration,
        ),
        course: new Types.ObjectId(requestedOfferedCourse.course),
        faculty: new Types.ObjectId(requestedOfferedCourse.faculty),
        _id: { $ne: new Types.ObjectId(id) },
      },
    },
    {
      $unwind: { path: '$days' },
    },
    {
      $match: { days: { $in: payload.days } },
    },
    { $project: { days: 1, startTime: 1, endTime: 1 } },
  ]);

  const newSchedule = {
    days: payload.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
  hasTimeConflict(assignedSchedules, newSchedule);

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createIntoDB,
  getAllFromDB,
  updateByIdIntoDB,
};
