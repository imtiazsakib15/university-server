import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { REGISTRATION_STATUS } from './semesterRegistration.constant';

const createIntoDB = async (payload: ISemesterRegistration) => {
  // check if any upcoming or ongoing semester exist
  const upcomingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [
      { status: REGISTRATION_STATUS.UPCOMING },
      { status: REGISTRATION_STATUS.ONGOING },
    ],
  });
  if (upcomingOrOngoingSemester)
    throw new AppError(
      httpStatus.CONFLICT,
      `An ${upcomingOrOngoingSemester.status} Semester is already exist!`,
    );

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

const updateByIdFromDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  const requestedSemester: ISemesterRegistration | null =
    await SemesterRegistration.findById(id);
  if (!requestedSemester)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found.',
    );
  if (requestedSemester.status === REGISTRATION_STATUS.ENDED)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester Registration is already ended.',
    );
  if (
    requestedSemester.status === REGISTRATION_STATUS.ONGOING &&
    payload?.status === REGISTRATION_STATUS.UPCOMING
  )
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${REGISTRATION_STATUS.ONGOING} to ${REGISTRATION_STATUS.UPCOMING}.`,
    );

  if (
    requestedSemester.status === REGISTRATION_STATUS.UPCOMING &&
    payload?.status === REGISTRATION_STATUS.ENDED
  )
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${REGISTRATION_STATUS.UPCOMING} to ${REGISTRATION_STATUS.ENDED}.`,
    );

  // check if the academic semester is not exist
  if (payload?.academicSemester) {
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
      $and: [
        { _id: { $not: { $eq: id } } },
        { academicSemester: payload.academicSemester },
      ],
    });
    if (isSemesterRegistrationExists)
      throw new AppError(
        httpStatus.CONFLICT,
        'Semester Registration is already exist!',
      );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
};
