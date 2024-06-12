import { Model, Types } from 'mongoose';

export interface IUserName {
  firstName: string;
  lastName: string;
}
export interface IGuardian {
  name: string;
  occupation: string;
  contactNo: string;
}

export interface IStudent {
  id: string;
  user: Types.ObjectId;
  name: IUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  academicSemester: Types.ObjectId;
  isDeleted?: boolean;
}

// custom instance method
// export type TStudentMethods = {
//   isStudentExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, {}, TStudentMethods>;

// custom static method
export interface StudentModel extends Model<IStudent> {
  isStudentExists(id: string): Promise<IStudent | null>;
}
