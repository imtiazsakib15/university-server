import { model, Schema } from 'mongoose';
import { ICourse, IPreRequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema<IPreRequisiteCourse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the course ID for the prerequisite.'],
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Please provide the course title.'],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, 'Please provide the course prefix.'],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, 'Please provide the course code.'],
      unique: true,
      trim: true,
    },
    credit: {
      type: Number,
      required: [true, 'Please provide the course credit.'],
      trim: true,
    },
    preRequisiteCourses: {
      type: [preRequisiteCourseSchema],
      default: [],
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

export const Course = model<ICourse>('Course', courseSchema);
