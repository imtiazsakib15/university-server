import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentInfo: TStudent) => {
  // const result = await StudentModel.create(studentInfo);

  // create a student using instance method
  const student = new StudentModel(studentInfo);
  const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id);
  return result;
};

export { createStudentIntoDB, getAllStudentsFromDB, getAStudentFromDB };
