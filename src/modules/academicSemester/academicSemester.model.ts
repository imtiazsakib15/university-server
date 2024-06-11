import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemester.interface';
import {
  ACADEMIC_SEMESTER_CODE,
  ACADEMIC_SEMESTER_NAME,
  MONTHS,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ACADEMIC_SEMESTER_NAME,
        message: '{VALUE} is not a valid name.',
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: ACADEMIC_SEMESTER_CODE,
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
        values: MONTHS,
        message: '{VALUE} is not a recognized month.',
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: MONTHS,
        message: '{VALUE} is not a recognized month.',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) throw new Error('Semester already exists!');
  next();
});

export const AcademicSemester = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
