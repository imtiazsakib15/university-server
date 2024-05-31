import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImg?: string;
  isActive?: 'active' | 'blocked';
  isDeleted?: boolean;
};

// custom instance method
// export type TStudentMethods = {
//   isStudentExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, {}, TStudentMethods>;

// custom static method
export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
