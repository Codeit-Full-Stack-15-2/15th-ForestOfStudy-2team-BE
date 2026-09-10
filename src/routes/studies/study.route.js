import { Router } from 'express';
// TODO: 추후 controllers/study.controller.js에서 실제 로직 함수들을 임포트합니다.

export const studyRoute = Router();

studyRoute.get('/', getStudies); // 스터디 리스트 조회
studyRoute.post('/', createStudy); // 스터디 만들기
studyRoute.get('/:study_id', getStudy); // 스터디 개별 조회
studyRoute.patch('/:study_id', updateStudy); // 스터디 수정
studyRoute.delete('/:study_id', deleteStudy); // 스터디 삭제

// 스터디 종속 서브 리소스
studyRoute.post('/:study_id/focus_logs', createFocusLog); // 집중 로그 만들기
studyRoute.post('/:study_id/reactions', createReaction); // 이모지 추가
studyRoute.delete('/:study_id/reactions/:guest_uuid', deleteReaction); // 이모지 삭제하기
studyRoute.patch('/:study_id/points', updatePoints); // 포인트 수정
