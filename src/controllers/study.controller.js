import * as studyService from '#src/services/study.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const getStudies = (req, res, next) => {};
export const createStudy = async (req, res, next) => {
  try {
    const newStudy = await studyService.createStudyService(req.body);

    return res.status(HTTP_STATUS.CREATE).json({
      success: true,
      data: newStudy,
      message: '스터디가 생성되었습니다.',
    });
  } catch (error) {
    // 3. 비즈니스 로직이나 DB 작업 중 발생한 에러를 중앙 에러 핸들러로 넘깁니다.
    next(error);
  }
};
export const verifyStudyPassword = async (req, res, next) => {
  try {
    const { study_id } = req.params;
    const { study_password } = req.body;

    // 서비스 계층에 검증 로직 위임
    const { token } = await studyService.verifyPasswordService(
      study_id,
      study_password,
    );

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { token },
      message: '비밀번호가 확인되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};
export const verifyToken = (req, res, next) => {
  try {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: { studyId: req.studyId },
      message: '유효한 토큰입니다.',
    });
  } catch (error) {
    next(error);
  }
};
export const getStudy = async (req, res, next) => {
  try {
    const studyId = req.params.study_id;
    const study = await studyService.getStudyService(studyId);
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      data: study,
      messgae: '스터디 정보 조회에 성공했습니다.',
    });
  } catch (error) {
    next(error);
  }
};
export const updateStudy = (req, res, next) => {};
export const deleteStudy = (req, res, next) => {};
export const createReaction = (req, res, next) => {};
export const deleteReaction = (req, res, next) => {};
export const updatePoints = (req, res, next) => {};
