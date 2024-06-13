import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

export const generateStudentId = async (payload: IStudent) => {
  const academicSemester: Partial<IAcademicSemester> | null =
    await AcademicSemester.findOne(
      {
        _id: payload.academicSemester,
      },
      {
        _id: 0,
        year: 1,
        code: 1,
      },
    ).lean();
  if (!academicSemester)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic semester is not valid',
    );

  const lastStudent: Partial<IStudent> | null = await Student.findOne(
    {
      id: new RegExp(`^${academicSemester.year}${academicSemester.code}`),
    },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  const studentIdLastPart = (Number(lastStudent?.id?.substring(6) ?? 0) + 1)
    .toString()
    .padStart(4, '0');
  const newStudentId = `${academicSemester.year}${academicSemester.code}${studentIdLastPart}`;

  return newStudentId;
};
