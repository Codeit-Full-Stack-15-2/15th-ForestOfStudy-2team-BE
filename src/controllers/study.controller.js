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
export const getStudy = (req, res, next) => {};
export const updateStudy = (req, res, next) => {};
export const deleteStudy = (req, res, next) => {};
export const createReaction = (req, res, next) => {};
export const deleteReaction = (req, res, next) => {};
export const updatePoints = (req, res, next) => {};
