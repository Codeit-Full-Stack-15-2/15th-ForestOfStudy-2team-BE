import * as habitController from '#src/controllers/habit.controller.js';
import * as studyController from '#src/controllers/study.controller.js';
import {
  verifyAccessToken,
  verifyStudyAccess,
} from '#src/middlewares/auth.middleware.js';
import {
  validateBody,
  validateParams,
  validateQuery,
} from '#src/middlewares/validate.middleware.js';
import {
  createReactionSchema,
  createStudySchema,
  getStudiesQuerySchema,
  studyIdSchema,
  verifyPasswordSchema,
  updateStudySchema,
  updatePointsSchema,
  checkNicknameQuerySchema,
} from '#src/validations/study.validate.js';
import { getWeeklyHabitRecordsQuerySchema } from '#src/validations/habit.validate.js';
import { Router } from 'express';
export const studyRoute = Router();

studyRoute.get(
  '/',
  validateQuery(getStudiesQuerySchema),
  studyController.getStudies,
); // 스터디 리스트 조회

studyRoute.post(
  '/',
  validateBody(createStudySchema),
  studyController.createStudy,
); // 스터디 만들기

studyRoute.get(
  '/:study_id',
  validateParams(studyIdSchema),
  studyController.getStudy,
); // 스터디 개별 조회

studyRoute.get('/verify', verifyAccessToken, studyController.verifyToken);

studyRoute.post(
  '/:study_id/verify',
  validateParams(studyIdSchema),
  validateBody(verifyPasswordSchema),
  studyController.verifyStudyPassword,
); // 스터디 비밀번호 검증

studyRoute.patch(
  '/:study_id',
  verifyAccessToken,
  validateParams(studyIdSchema),
  verifyStudyAccess,
  validateBody(updateStudySchema),
  studyController.updateStudy,
); // 스터디 수정

studyRoute.delete(
  '/:study_id',
  validateParams(studyIdSchema),
  studyController.deleteStudy,
); // 스터디 삭제

// 스터디 종속 서브 리소스
// studyRoute.post('/:study_id/focus_logs', createFocusLog); // 집중 로그 만들기
studyRoute.post(
  '/:study_id/reactions',
  validateParams(studyIdSchema),
  validateBody(createReactionSchema),
  studyController.createReaction,
); // 이모지 추가

studyRoute.patch(
  '/:study_id/points',
  verifyAccessToken,
  validateParams(studyIdSchema),
  verifyStudyAccess,
  validateBody(updatePointsSchema),
  studyController.updatePoints,
); // 포인트 수정

studyRoute.get('/', validateParams(studyIdSchema), habitController.getHabits); // 오늘의 습관 리스트 조회

studyRoute.post(
  '/',
  validateParams(studyIdSchema),
  //validateBody(createHabitSchema),
  habitController.createHabits,
); // 오늘의 습관 만들기

studyRoute.patch(
  '/',
  validateParams(studyIdSchema),
  //validateBody(updateHabitsSchema),
  habitController.updateHabits,
); // 오늘의 습관 수정

studyRoute.delete('/', habitController.deleteHabits); // 오늘의 습관 삭제

studyRoute.get(
  '/:study_id/habits/records/weekly',
  validateParams(studyIdSchema),
  validateQuery(getWeeklyHabitRecordsQuerySchema),
  habitController.getWeeklyHabitRecords,
); // 주단위 습관 기록 조회

studyRoute.get(
  '/nickname/check',
  validateQuery(checkNicknameQuerySchema),
  studyController.checkNicknameAvailability,
); // 닉네임 중복 확인
