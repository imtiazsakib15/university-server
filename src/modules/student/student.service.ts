import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentInfo: TStudent) => {
  // check if student exists using custom static method
  if (await Student.isStudentExists(studentInfo.id))
    throw new Error('Student already exists!');
  const result = await Student.create(studentInfo);

  // check if student exists using custom instance method
  // const student = new Student(studentInfo);
  // if (await student.isStudentExists(studentInfo.id))
  //   throw new Error('Student already exists!');
  // const result = await student.save();
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

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteStudentFromDB,
};
