import * as habitService from '#src/services/habit.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const getHabits = async (req, res) => {
  const { study_id: studyId } = req.validated.params;
  const date = req.validated.query?.date || req.query?.date;

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

  const updatedHabits = await habitService.updateHabitsService(studyId, habits);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: updatedHabits,
    message: '습관 정보가 수정되었습니다.',
  });
};

export const toggleHabbitRecord = async (req, res) => {
  const { habit_id: habitId } = req.validated.params;
  const { isComplete, recordDate } = req.validated.body;

  const targetDate = recordDate || new Date().toISOString().split('T')[0];

  const updateRecord = await habitService.toggleHabitRecordService(
    habitId,
    targetDate,
    isComplete,
  );

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: updateRecord,
    message: isComplete ? '습관을 완료했습니다.' : '습관 완료를 취소했습니다.',
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
};
