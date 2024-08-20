import { Types } from 'mongoose';
import { IUserName } from '../student/student.interface';

export interface IFaculty {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  designation: string;
  contactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
