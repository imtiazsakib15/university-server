import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

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

export const SemesterRegistrationServices = { createIntoDB };
