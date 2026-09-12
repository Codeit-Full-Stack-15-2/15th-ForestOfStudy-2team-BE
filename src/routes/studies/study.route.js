import * as studyController from '#src/controllers/study.controller.js';
import { verifyAccessToken } from '#src/middlewares/auth.middleware.js';
import {
  validateBody,
  validateParams,
} from '#src/middlewares/validate.middleware.js';
import {
  createReactionSchema,
  createStudySchema,
  studyIdSchema,
  verifyPasswordSchema,
} from '#src/validations/study.validate.js';
import { Router } from 'express';
export const studyRoute = Router();

studyRoute.get('/', studyController.getStudies); // 스터디 리스트 조회

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
  validateParams(studyIdSchema),
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
studyRoute.delete(
  '/:study_id/reactions/:guest_uuid',
  studyController.deleteReaction,
); // 이모지 삭제하기
studyRoute.patch('/:study_id/points', studyController.updatePoints); // 포인트 수정
