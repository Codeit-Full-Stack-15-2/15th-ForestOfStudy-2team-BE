import * as habitService from '#src/services/habit.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const getHabits = (req, res, next) => {};
export const createHabit = (req, res, next) => {};
export const updateHabit = (req, res, next) => {};
export const deleteHabit = (req, res, next) => {};
export const getWeeklyHabitRecords = async (req, res, next) => {
  try {
    const studyId = req.validated.query.study_id;
    const targetDate = req.validated.query.start_date;
    const weeklyHabitRecords = await habitService.getWeeklyRecords(
      studyId,
      targetDate,
    );
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: weeklyHabitRecords,
      message: '스터디가 생성되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};
