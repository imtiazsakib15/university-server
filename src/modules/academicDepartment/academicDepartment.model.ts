import { Schema, model } from 'mongoose';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExists = !!(await AcademicDepartment.findOne({
    name: this.name,
  }));

  if (isAcademicDepartmentExists)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic department already exists!',
    );
  next();
});
academicDepartmentSchema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isAcademicDepartmentExists =
    !!(await AcademicDepartment.findOne(query));

  if (!isAcademicDepartmentExists)
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department is not found!',
    );
  next();
});

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
