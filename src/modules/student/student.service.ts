import mongoose from 'mongoose';
import { IStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await Student.findById(id);
  // const result = await Student.aggregate([
  //   {
  //     $match: { _id: new mongoose.Types.ObjectId(id) },
  //   },
  // ]);
  return result;
};

const updateAStudentIntoDB = async (id: string, studentInfo: IStudent) => {
  const result = await Student.updateOne({ _id: id }, studentInfo);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export {
  getAllStudentsFromDB,
  getAStudentFromDB,
  updateAStudentIntoDB,
  deleteStudentFromDB,
};
