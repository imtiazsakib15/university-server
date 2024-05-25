import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentInfo: TStudent) => {
  // const result = await StudentModel.create(studentInfo);

  // create a student using instance method
  const student = new Student(studentInfo);
  if (await student.isStudentExists(studentInfo.id))
    throw new Error('Student already exists!');
  const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getAStudentFromDB = async (id: string) => {
  const result = await Student.findById(id);
  return result;
};

export { createStudentIntoDB, getAllStudentsFromDB, getAStudentFromDB };
