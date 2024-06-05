import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TStudent,
  // TStudentMethods,
  TUserName,
} from './student.interface';
// import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

// const userNameSchema = new Schema<TUserName, StudentModel, TStudentMethods>(
const userNameSchema = new Schema<TUserName, StudentModel>(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide the first name.'],
      trim: true,
      // validate: {
      //   validator: (value: string) => validator.isAlpha(value),
      //   message: '{VALUE} is not a valid first name.',
      // },
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

const guardianSchema = new Schema<TGuardian>(
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

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Please provide the student id.'],
    },
    password: {
      type: String,
      required: [true, 'Please provide the password.'],
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
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email address.',
      // },
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
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status.',
      },
      default: 'active',
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

// pre save middleware / hook
studentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
studentSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

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
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
