import { model, Schema } from 'mongoose';
import { IOfferedCourse } from './offeredCourse.interface';
import { DAYS } from './offeredCourse.constant';

const offeredCourseSchema = new Schema<IOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: [true, 'Please provide the semester registration ID.'],
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: [true, 'Please provide the academic faculty ID.'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Please provide the academic department ID.'],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Please provide the course ID.'],
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: [true, 'Please provide the faculty ID.'],
    },
    maxCapacity: {
      type: Number,
      required: [true, 'Please provide the maximum capacity.'],
    },
    section: {
      type: Number,
      required: [true, 'Please provide the section number.'],
      min: [1, 'Section number must be at least 1.'],
    },
    days: {
      type: [String],
      enum: {
        values: DAYS,
        message: 'Day must be one of: Sat, Sun, Mon, Tue, Wed, Thu, Fri',
      },
      required: [true, 'Please provide the days.'],
    },
    startTime: {
      type: String,
      required: [true, 'Please provide the start time.'],
    },
    endTime: {
      type: String,
      required: [true, 'Please provide the end time.'],
    },
  },
  {
    timestamps: true,
  },
);

export const OfferedCourse = model<IOfferedCourse>(
  'OfferedCourse',
  offeredCourseSchema,
);
