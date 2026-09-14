import * as habitService from '#src/services/habit.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const getHabits = async (req, res) => {
  const { studyId } = req.validated.params;
  const { date } = req.validated.params || req.query;

  const habits = await habitService.getHabitsService(studyId, date);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: habits,
    message: '습관 목록을 가져오는데 성공했습니다.',
  });
};

export const createHabits = async (req, res) => {
  const { study_id } = req.validated.params;
  const { titles } = req.validated.body;

  const newHabit = await habitService.createHabitsService(study_id, titles);
  res.status(HTTP_STATUS.CREATE).json({
    success: true,
    data: newHabit,
    message: '습관이 생성되었습니다.',
  });
};

export const updateHabits = async (req, res) => {
  const { study_id } = req.validated.params;
  const { habits } = req.validated.body;

  const updateHabits = await habitService.updateHabitsService(study_id, habits);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: updateHabits,
    message: '습관을 성공적으로 수정했습니다.',
  });
};

export const deleteHabits = async (req, res) => {
  const { study_id } = req.validated.params;
  const { habitIds } = req.validated.body;

  const result = await habitService.deleteHabitsService(study_id, habitIds);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: result,
    message: '습관을 성공적으로 삭제했습니다.',
  });
};

export const getWeeklyHabitRecords = async (req, res, next) => {
  try {
    const studyId = req.validated.params.study_id;
    const targetDate = req.validated.query.target_date;
    const page = req.validated.query.page;
    const pageSize = req.validated.query.page_size;
    const weeklyHabitRecords = await habitService.getWeeklyRecords(
      studyId,
      targetDate,
      page,
      pageSize,
    );
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: weeklyHabitRecords,
      message: '주단위 습관 목록을 가져오는데 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
};
