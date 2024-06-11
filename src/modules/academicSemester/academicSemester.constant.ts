import {
  IAcademicSemesterNameCodeMapper,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

export const ACADEMIC_SEMESTER_NAME: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const ACADEMIC_SEMESTER_CODE: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const MONTHS: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const ACADEMIC_SEMESTER_NAME_CODE_MAPPER: IAcademicSemesterNameCodeMapper =
  {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
