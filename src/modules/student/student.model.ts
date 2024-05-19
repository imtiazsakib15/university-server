import { Schema, model } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const guardianSchema = new Schema<Guardian>(
  {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const studentSchema = new Schema<Student>(
  {
    name: userNameSchema,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: { type: String, required: true },
    parmanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    profileImg: { type: String },
    isActive: { type: String, enum: ['active', 'blocked'] },
  },
  {
    timestamps: true,
  },
);

export const StudentModel = model<Student>('Student', studentSchema);
