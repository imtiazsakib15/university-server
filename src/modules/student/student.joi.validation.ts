import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
});

const guardianValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  occupation: Joi.string().min(2).max(50).required(),
  contactNo: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const studentValidationSchema = Joi.object({
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  dateOfBirth: Joi.date().iso(),
  email: Joi.string().email().required(),
  contactNo: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ),
  presentAddress: Joi.string().min(2).max(50).required(),
  permanentAddress: Joi.string().min(2).max(50).required(),
  guardian: guardianValidationSchema.required(),
  profileImg: Joi.string().uri(),
  isActive: Joi.string().valid('active', 'blocked'),
});

export default studentValidationSchema;
