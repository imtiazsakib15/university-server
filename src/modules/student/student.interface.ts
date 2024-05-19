export type UserName = {
  firstName: string;
  lastName: string;
};
export type Guardian = {
  name: string;
  occupation: string;
  contactNo: string;
};

export type Student = {
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
