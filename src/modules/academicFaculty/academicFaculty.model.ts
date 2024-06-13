import { Schema, model } from 'mongoose';
import { IAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic faculty already exists!',
    );
  next();
});
academicFacultySchema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isAcademicFacultyExists = !!(await AcademicFaculty.findOne(query));

  if (!isAcademicFacultyExists)
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty is not found!');
  next();
});

export const AcademicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
