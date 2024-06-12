import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createIntoDB = async (payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllFromDB = async () => {
  const allAcademicDepartments = await AcademicDepartment.find({}).populate(
    'academicFaculty',
  );
  return allAcademicDepartments;
};

const getByIdFromDB = async (departmentId: string) => {
  const academicDepartment = await AcademicDepartment.findById({
    _id: departmentId,
  }).populate('academicFaculty');
  return academicDepartment;
};

const updateByIdIntoDB = async (
  departmentId: string,
  payload: IAcademicDepartment,
) => {
  const result = await AcademicDepartment.updateOne(
    {
      _id: departmentId,
    },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
};
