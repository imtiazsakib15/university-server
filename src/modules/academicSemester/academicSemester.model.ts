import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterName,
        message: '{VALUE} is not a valid name.',
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCode,
        message: '{VALUE} is not a valid code.',
      },
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a recognized month.',
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: months,
        message: '{VALUE} is not a recognized month.',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemesterSchema = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
