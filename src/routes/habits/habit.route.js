import * as habitController from '#src/controllers/habit.controller.js';
import { validateBody, validateParams } from '#src/middlewares/validate.middleware.js';
import { createHabit } from '#src/repositories/habit.repository.js';
import { createHabitSchema ,habitIdSchema, updateHabitsSchema } from '#src/validations/habit.validate.js';
import { studyIdSchema } from '#src/validations/study.validate.js';
import { Router } from 'express';


export const habitRoute = Router({mergeParams: true});

habitRoute.get('/studies/:study_id/habits',
  validateParams(studyIdSchema),
  validateParams(habitIdSchema),
  validateBody(getHabitSchema),
   habitController.getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)

habitRoute.post('/studies/:study_id/habits',
  validateParams(studyIdSchema),
  validateBody(createHabitSchema),
  habitController.createHabits); // 오늘의 습관 만들기

habitRoute.patch('/studies/:study_id/habits',
  validateParams(studyIdSchema),
  validateBody(updateHabitsSchema),
   habitController.updateHabit); // 오늘의 습관 수정

habitRoute.delete('/studies/:study_id/habits', habitController.deleteHabits); // 오늘의 습관 삭제
