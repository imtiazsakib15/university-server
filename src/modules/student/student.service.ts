import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getByIdFromDB = async (id: string) => {
  const result = await Student.findById(id);
  // const result = await Student.aggregate([
  //   {
  //     $match: { _id: new mongoose.Types.ObjectId(id) },
  //   },
  // ]);
  return result;
};

const updateByIdIntoDB = async (id: string, studentInfo: IStudent) => {
  const result = await Student.updateOne({ _id: id }, studentInfo);
  return result;
};

const deleteByIdFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
