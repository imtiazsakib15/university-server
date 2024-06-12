import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExists = !!(await AcademicFaculty.findOne({
    name: this.name,
  }));

  if (isAcademicFacultyExists)
    throw new Error('Academic faculty already exists!');
  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
