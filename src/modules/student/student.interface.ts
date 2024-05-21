export type TUserName = {
  firstName: string;
  lastName: string;
};
export type TGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
};

export type TStudent = {
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
