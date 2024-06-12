import { ACADEMIC_SEMESTER_NAME_CODE_MAPPER } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createIntoDB = async (payload: IAcademicSemester) => {
  if (ACADEMIC_SEMESTER_NAME_CODE_MAPPER[payload.name] !== payload.code)
    throw new Error("Semester name and code doesn't match");

  const result = await AcademicSemester.create(payload);
  return result;
};

const getFromDB = async () => {
  const allAcademicSemesters = await AcademicSemester.find({});
  return allAcademicSemesters;
};

const getByIdFromDB = async (id: string) => {
  const academicSemester = await AcademicSemester.findById({ _id: id });
  return academicSemester;
};

const updateByIdIntoDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    ACADEMIC_SEMESTER_NAME_CODE_MAPPER[payload.name] !== payload.code
  )
    throw new Error("Semester name and code doesn't match");

  const result = await AcademicSemester.updateOne({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const AcademicSemesterServices = {
  createIntoDB,
  getFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
};
