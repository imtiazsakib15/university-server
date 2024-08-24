import { model, Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SEMESTER_REGISTRATION_STATUS } from './semesterRegistration.constant';

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the academic semester ID.'],
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: {
        values: SEMESTER_REGISTRATION_STATUS,
        message: '{VALUE} is not a valid status.',
      },
      required: [true, 'Please provide the registration status.'],
    },
    startDate: {
      type: Date,
      required: [true, 'Please provide the start date of the semester.'],
    },
    endDate: {
      type: Date,
      required: [true, 'Please provide the end date of the semester.'],
    },
    minCredit: {
      type: Number,
      required: [true, 'Please provide the minimum credit allowed.'],
      min: [3, 'Minimum credit must be at least 3.'],
    },
    maxCredit: {
      type: Number,
      required: [true, 'Please provide the maximum credit allowed.'],
      max: [15, 'Maximum credit must be at most 15.'],
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<ISemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
