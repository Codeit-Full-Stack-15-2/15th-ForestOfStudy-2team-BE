import * as studyController from '#src/controllers/study.controller.js';
import { verifyAccessToken } from '#src/middlewares/auth.middleware.js';
import { validate } from '#src/middlewares/validate.middleware.js';
import {
  createStudySchema,
  studyIdSchema,
  verifyPasswordSchema,
} from '#src/validations/study.validate.js';
import { Router } from 'express';
export const studyRoute = Router();

studyRoute.get('/', studyController.getStudies); // 스터디 리스트 조회
studyRoute.post('/', validate(createStudySchema), studyController.createStudy); // 스터디 만들기
studyRoute.get(
  '/:study_id',
  validate(studyIdSchema, 'params'),
  studyController.getStudy,
); // 스터디 개별 조회
studyRoute.get('/verify', verifyAccessToken, studyController.verifyToken);
studyRoute.post(
  '/:study_id/verify',
  validate(verifyPasswordSchema),
  studyController.verifyStudyPassword,
);
studyRoute.patch(
  '/:study_id',
  validate(studyIdSchema, 'params'),
  studyController.updateStudy,
); // 스터디 수정
studyRoute.delete(
  '/:study_id',
  validate(studyIdSchema, 'params'),
  studyController.deleteStudy,
); // 스터디 삭제

// 스터디 종속 서브 리소스
// studyRoute.post('/:study_id/focus_logs', createFocusLog); // 집중 로그 만들기
studyRoute.post('/:study_id/reactions', studyController.createReaction); // 이모지 추가
studyRoute.delete(
  '/:study_id/reactions/:guest_uuid',
  studyController.deleteReaction,
); // 이모지 삭제하기
studyRoute.patch('/:study_id/points', studyController.updatePoints); // 포인트 수정
