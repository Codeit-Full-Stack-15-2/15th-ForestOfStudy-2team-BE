import * as habitController from '#src/controllers/habit.controller.js';
import { validateQuery } from '#src/middlewares/validate.middleware.js';
import { getWeeklyHabitRecordsQuerySchema } from '#src/validations/study.validate.js';
import { Router } from 'express';

export const habitRoute = Router();

habitRoute.get('/', habitController.getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)
habitRoute.post('/', habitController.createHabit); // 오늘의 습관 만들기
habitRoute.patch('/:habit_id', habitController.updateHabit); // 오늘의 습관 수정
habitRoute.delete('/:habit_id', habitController.deleteHabit); // 오늘의 습관 삭제
habitRoute.get(
  '/records/weekly',
  validateQuery(getWeeklyHabitRecordsQuerySchema),
  habitController.getWeeklyHabitRecords,
); // 주단위 습관 기록 조회
