import { model, Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'Please provide the academic semester ID.'],
    },
    status: {
      type: String,
      enum: {
        values: ['UPCOMING', 'ONGOING', 'ENDED'],
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
      min: [15, 'Maximum credit must be at least 15.'],
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
