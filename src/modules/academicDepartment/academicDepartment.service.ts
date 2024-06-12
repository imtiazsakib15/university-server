import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllFromDB = async () => {
  const allAcademicDepartments = await AcademicDepartment.find({});
  return allAcademicDepartments;
};

export const AcademicDepartmentServices = {
  createIntoDB,
  getAllFromDB,
};
