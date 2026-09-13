import * as habitController from '#src/controllers/habit.controller.js';
import { validateBody, validateParams } from '#src/middlewares/validate.middleware.js';
import { createHabitSchema, updateHabitsSchema } from '#src/validations/habit.validate.js';
import { studyIdSchema } from '#src/validations/study.validate.js';
import { Router } from 'express';


export const habitRoute = Router({mergeParams: true});

habitRoute.get('/',
  validateParams(studyIdSchema),
   habitController.getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)

habitRoute.post('/',
  validateParams(studyIdSchema),
  validateBody(createHabitSchema),
  habitController.createHabits); // 오늘의 습관 만들기

habitRoute.patch('/',
  validateParams(studyIdSchema),
  validateBody(updateHabitsSchema),
   habitController.updateHabits); // 오늘의 습관 수정

habitRoute.delete('/', habitController.deleteHabits); // 오늘의 습관 삭제
