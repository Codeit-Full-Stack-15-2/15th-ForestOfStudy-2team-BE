import { ForbiddenException } from '#src/errors/forbidden-exception.js';
import { UnauthorizedException } from '#src/errors/unauthorized-exception.js';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../constants/index.js';

export const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(ERROR_MESSAGES.TOKEN_MISSING);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.studyId = decoded.studyId;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      return next(error);
    }
    next(new UnauthorizedException(ERROR_MESSAGES.TOKEN_INVALID));
  }
};

export const verifyStudyAccess = (req, res, next) => {
  const tokenStudyId = Number(req.studyId);
  const paramStudyId = Number(req.params.study_id);

  if (tokenStudyId !== paramStudyId) {
    return next(new ForbiddenException('해당 스터디에 대한 권한이 없습니다.'));
  }

  next();
};
