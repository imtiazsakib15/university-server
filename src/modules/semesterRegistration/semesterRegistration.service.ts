import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createIntoDB = async (payload: ISemesterRegistration) => {
  // check if the academic semester is not exist
  const isAcademicSemesterExists = await AcademicSemester.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExists)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester does not exist!',
    );

  // check if the semester registration is already exist
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester: payload.academicSemester,
  });
  if (isSemesterRegistrationExists)
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester Registration is already exist!',
    );

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    SemesterRegistration.find().populate({
      path: 'academicSemester',
    }),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fieldLimiting();

  const result = await courseQuery.modelQuery;
  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate({
    path: 'academicSemester',
  });

  if (!result)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found.',
    );
  return result;
};

export const SemesterRegistrationServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
