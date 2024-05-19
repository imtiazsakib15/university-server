import { Schema, model } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
