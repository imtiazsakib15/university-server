import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

export const generateStudentId = async (payload: Partial<IStudent>) => {
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

  const lastStudent: IStudent | null = await Student.findOne(
    {
      id: new RegExp(`^${academicSemester.year}${academicSemester.code}`),
    },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  const studentIdLastPart: string = (
    Number(lastStudent?.id?.substring(6) ?? 0) + 1
  )
    .toString()
    .padStart(4, '0');
  const newStudentId: string = `${academicSemester.year}${academicSemester.code}${studentIdLastPart}`;

  return newStudentId;
};

export const generateFacultyId = async () => {
  const lastFaculty: IFaculty | null = await Faculty.findOne(
    {},
    { _id: 0, id: 1, createdAt: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  const newFacultyIdLastPart: string = (
    Number(lastFaculty?.id?.substring(2) ?? 0) + 1
  )
    .toString()
    .padStart(4, '0');

  const newFacultyId: string = `F-${newFacultyIdLastPart}`;
  return newFacultyId;
};
