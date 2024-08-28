import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISchedule, TDays } from './offeredCourse.interface';

interface IAssignedSchedule {
  days: TDays;
  startTime: string;
  endTime: string;
}

export const hasTimeConflict = (
  assignedSchedules: IAssignedSchedule[],
  newSchedule: ISchedule,
) => {
  assignedSchedules?.forEach((schedule) => {
    newSchedule.days?.map((day) => {
      if (day === schedule.days) {
        if (
          newSchedule.startTime < schedule.endTime &&
          schedule.startTime < newSchedule.endTime
        ) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `The faculty already have a schedule at '${schedule.startTime}' to '${schedule.endTime}' on '${schedule.days}'`,
          );
        }
      }
    });
  });
};
