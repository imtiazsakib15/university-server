import { ACADEMIC_SEMESTER_NAME_CODE_MAPPER } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: IAcademicSemester) => {
  if (ACADEMIC_SEMESTER_NAME_CODE_MAPPER[payload.name] !== payload.code)
    throw new Error("Semester name and code doesn't match");

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const allAcademicSemesters = await AcademicSemester.find({});
  return allAcademicSemesters;
};

export { createAcademicSemesterIntoDB, getAllAcademicSemestersFromDB };
