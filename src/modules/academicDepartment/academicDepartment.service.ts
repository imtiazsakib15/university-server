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

const getByIdFromDB = async (departmentId: string) => {
  const academicDepartment = await AcademicDepartment.findOne({
    _id: departmentId,
  });
  return academicDepartment;
};

export const AcademicDepartmentServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
