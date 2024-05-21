import { Schema, model } from 'mongoose';
import { TGuardian, TStudent, TUserName } from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide the first name.'],
      trim: true,
      // validate: {
      //   validator: (value: string) => validator.isAlpha(value),
      //   message: '{VALUE} is not a valid first name.',
      // },
    },
    lastName: {
      type: String,
      required: [true, 'Please provide the last name.'],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const guardianSchema = new Schema<TGuardian>(
  {
    name: {
      type: String,
      required: [true, "Please provide the guardian's name."],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, "Please provide the guardian's occupation."],
      trim: true,
    },
    contactNo: {
      type: String,
      required: [true, "Please provide the guardian's contact number."],
    },
  },
  {
    _id: false,
  },
);

const studentSchema = new Schema<TStudent>(
  {
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
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email address.',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Please provide a contact number.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a recognized blood group.',
      },
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
    guardian: {
      type: guardianSchema,
      required: [true, 'Please provide guardian information.'],
    },
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status.',
      },
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

export const StudentModel = model<TStudent>('Student', studentSchema);
