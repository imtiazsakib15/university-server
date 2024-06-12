import config from '../../config';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentInfo: IStudent) => {
  const userInfo: Partial<IUser> = {
    id: await generateStudentId(studentInfo),
    password: password || (config.default_password as string),
    role: 'student',
    status: 'in-progress',
  };
  const newUser = await User.create(userInfo);

  if (Object.keys(newUser).length) {
    studentInfo.user = newUser._id;
    studentInfo.id = newUser.id;

    const newStudent = await Student.create(studentInfo);
    return newStudent;
  }
};

export { createStudentIntoDB };
