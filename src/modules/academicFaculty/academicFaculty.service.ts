import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFromDB = async () => {
  const allAcademicFaculties = await AcademicFaculty.find({});
  return allAcademicFaculties;
};

export const AcademicFacultyServices = {
  createIntoDB,
  getAllFromDB,
};
