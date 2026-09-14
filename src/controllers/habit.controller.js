import * as habitService from '#src/services/habit.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const getHabits = async (req, res) => {
  const { study_id: studyId } = req.validated.params;
  const { date } = req.validated.params || req.query;

  const habits = await habitService.getHabitsService(studyId, date);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: habits,
    message: '습관 목록을 가져오는데 성공했습니다.',
  });
};

export const createHabits = async (req, res) => {
  const { study_id: studyId } = req.validated.params;
  const { title } = req.validated.body;

  const newHabit = await habitService.createHabitsService(studyId, title);
  res.status(HTTP_STATUS.CREATE).json({
    success: true,
    data: newHabit,
    message: '습관이 생성되었습니다.',
  });
};

export const updateHabits = async (req, res) => {
  const { study_id: studyId } = req.validated.params;
  const { habits } = req.validated.body;

  const updateHabits = await habitService.updateHabitsService(studyId, habits);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: updateHabits,
    message: '습관을 성공적으로 수정했습니다.',
  });
};

export const deleteHabits = async (req, res) => {
  const { study_id: studyId } = req.validated.params;
  const { habitIds } = req.validated.body;

  const result = await habitService.deleteHabitsService(studyId, habitIds);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result,
    message: '습관을 성공적으로 삭제했습니다.',
  });
};

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
