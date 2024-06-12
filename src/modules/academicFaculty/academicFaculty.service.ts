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

const getByIdFromDB = async (facultyId: string) => {
  const academicFaculty = await AcademicFaculty.findById({ _id: facultyId });
  return academicFaculty;
};

const updateByIdIntoDB = async (
  facultyId: string,
  payload: IAcademicFaculty,
) => {
  const academicFaculty = await AcademicFaculty.updateOne(
    {
      _id: facultyId,
    },
    payload,
    { new: true },
  );
  return academicFaculty;
};

export const AcademicFacultyServices = {
  createIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
};
