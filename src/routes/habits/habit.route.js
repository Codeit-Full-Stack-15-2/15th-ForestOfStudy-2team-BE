import { Router } from 'express';
// TODO: 추후 controllers/habit.controller.js에서 실제 로직 함수들을 임포트합니다.

export const habitRoute = Router();

habitRoute.get('/', getHabits); // 오늘의 습관 리스트 조회 (예: /habits?study_id=1)
habitRoute.post('/', createHabit); // 오늘의 습관 만들기
habitRoute.patch('/:habit_id', updateHabit); // 오늘의 습관 수정
habitRoute.delete('/:habit_id', deleteHabit); // 오늘의 습관 삭제
