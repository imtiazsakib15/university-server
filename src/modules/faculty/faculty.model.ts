import { Schema, model } from 'mongoose';
import { userNameSchema } from '../student/student.model';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Please provide the faculty id.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the user id.'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Please provide the student name.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not a valid gender. Please specify either "male" or "female".',
      },
      required: [true, "Please specify the student's gender."],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, 'Please provide a designation.'],
    },
    contactNo: {
      type: String,
      required: [true, 'Please provide a contact number.'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Please provide the present address.'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Please provide the permanent address.'],
      trim: true,
    },
    profileImg: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the academic faculty.'],
      ref: 'AcademicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the academic department.'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<IFaculty>('Faculty', facultySchema);
