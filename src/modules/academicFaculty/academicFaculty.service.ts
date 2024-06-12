import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createIntoDB = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const AcademicFacultyServices = {
  createIntoDB,
};
