import { Schema, model } from 'mongoose';
import {
  StudentModel,
  IGuardian,
  IStudent,
  // TStudentMethods,
  IUserName,
} from './student.interface';

const userNameSchema = new Schema<IUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide the first name.'],
      trim: true,
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

const guardianSchema = new Schema<IGuardian>(
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

// const studentSchema = new Schema<IStudent, StudentModel, TStudentMethods>(
const studentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Please provide the student id.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide the user id.'],
      unique: true,
      ref: 'User',
    },
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
      // unique: true,
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// custom instance method
// studentSchema.method(
//   'isStudentExists',
//   async function isStudentExists(id: string) {
//     const existingStudent = await Student.findOne({ id });
//     return existingStudent;
//   },
// );

// custom static method
studentSchema.statics.isStudentExists = async (id: string) => {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// query middleware/hook
// filter out deleted students when searching all students
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// filter out deleted student when searching a student
studentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// filter out deleted students when searching all students
studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// get fullName using virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
