import * as habitController from '#src/controllers/habit.controller.js';
import { validateBody, validateParams } from '#src/middlewares/validate.middleware.js';
import { createHabitSchema ,habitIdSchema, updateHabitsSchema } from '#src/validations/habit.validate.js';
import { Router } from 'express';


export const habitRoute = Router();

habitRoute.get('/studies/:study_id/habits', habitController.getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)
habitRoute.post('/studies/:study_id/habits', habitController.createHabit); // 오늘의 습관 만들기
habitRoute.patch('/studies/:study_id/habits',
  validateParams(habitIdSchema),
  validateBody(updateHabitsSchema),
   habitController.updateHabit); // 오늘의 습관 수정
habitRoute.delete('/studies/:study_id/habits', habitController.deleteHabit); // 오늘의 습관 삭제
