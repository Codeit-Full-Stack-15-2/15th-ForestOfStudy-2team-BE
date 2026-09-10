import * as habitController from '#src/controllers/habit.controller.js';
import { Router } from 'express';

export const habitRoute = Router();

habitRoute.get('/', habitController.getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)
habitRoute.post('/', habitController.createHabit); // 오늘의 습관 만들기
habitRoute.patch('/:habit_id', habitController.updateHabit); // 오늘의 습관 수정
habitRoute.delete('/:habit_id', habitController.deleteHabit); // 오늘의 습관 삭제
