import { NotFoundException } from '#src/errors/not-found-exception.js';
import { UnauthorizedException } from '#src/errors/unauthorized-exception.js';
import * as studyRepository from '#src/repositories/study.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '../constants/index.js';

export const createStudyService = async (studyData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    studyData.study_password,
    saltRounds,
  );
  // 해시된 비밀번호로 교체하여 데이터베이스에 전달합니다.
  const studyPayload = {
    ...studyData,
    study_password: hashedPassword,
  };
  const newStudy = await studyRepository.createStudyRecord(studyPayload);
  return newStudy;
};

export const verifyPasswordService = async (studyId, inputPassword) => {
  const study = await studyRepository.findStudyById(studyId);

  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(inputPassword, study.studyPassword);

  if (!isMatch) {
    throw new UnauthorizedException(ERROR_MESSAGES.PASSWORD_MISMATCH);
  }

  const token = jwt.sign({ studyId: study.id }, process.env.JWT_SECRET);

  return { verified: true, token };
};

export const getStudiesService = async (keyword, orderBy, page, pageSize) => {
  const { studies, totalCount } = await studyRepository.findStudies(
    keyword,
    orderBy,
    page,
    pageSize,
  );

  return { studies, totalCount };
};

export const getStudyService = async (studyId) => {
  const study = await studyRepository.findStudyById(studyId);
  return {
    id: study.id,
    nickname: study.nickname,
    title: study.title,
    description: study.description,
    background: study.background,
    point: study.point,
    createdAt: study.createdAt,
    reactions: study.reactions,
  };
};

export const handleReactionToggleService = async (studyId, body) => {
  const numericStudyId = Number(studyId);
  const { emoji, guest_uuid } = body;

  const existingReaction = await studyRepository.findActiveReaction({
    studyId: numericStudyId,
    emoji,
    guestUuid: guest_uuid,
  });

  if (existingReaction) {
    const softDeleted = await studyRepository.softDeleteReaction(
      existingReaction.id,
    );
    return { action: 'deleted', reaction: softDeleted };
  }

  // 3. 누른 적이 없다면 새로 등록 (규칙 1)
  const created = await studyRepository.createReaction({
    studyId: numericStudyId,
    emoji,
    guestUuid: guest_uuid,
  });

  return { action: 'created', reaction: created };
};

export const deleteStudyService = async (studyId) => {
  const study = await studyRepository.findActiveStudyOnly(studyId);

  if (!study) {
    throw new NotFoundException('존재하지 않거나 이미 삭제된 스터디입니다.');
  }

  const softDeleted = await studyRepository.updateStudyDeletedAt(studyId);

  return {
    id: softDeleted.id,
    nickname: softDeleted.nickname,
    title: softDeleted.title,
    description: softDeleted.description,
    background: softDeleted.background,
    point: softDeleted.point,
    createdAt: softDeleted.createdAt,
    reactions: softDeleted.reactions,
  };
};

export const updateStudyService = async (studyId, updateData) => {
  const study = await studyRepository.findStudyById(studyId);

  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const updatedStudy = await studyRepository.updateStudyRecord(
    studyId,
    updateData,
  );

  return {
    nickname: updatedStudy.nickname,
    title: updatedStudy.title,
    description: updatedStudy.description,
    background: updatedStudy.background,
  };
};

const findStudyWithPoint = async (studyId) => {
  const study = await studyRepository.findActiveStudyWithPoint(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }
  return study;
};

export const addPointService = async (studyId, minutes) => {
  const study = await findStudyWithPoint(studyId);

  const addPoint = 3 + Math.floor(minutes / 10);
  const prevPoint = study.point;
  const totalPoint = prevPoint + addPoint;

  const updated = await studyRepository.updateStudyPoint(studyId, totalPoint);

  return {
    add_point: addPoint,
    prev_point: prevPoint,
    total_point: updated.point,
  };
};
