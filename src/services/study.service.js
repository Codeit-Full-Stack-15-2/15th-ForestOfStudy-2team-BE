import * as studyRepository from '#src/repositories/study.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    const error = new Error('존재하지 않는 스터디입니다.');
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(inputPassword, study.studyPassword);

  if (!isMatch) {
    const error = new Error('비밀번호가 일치하지 않습니다.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ studyId: study.id }, process.env.JWT_SECRET);

  return { verified: true, token };
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
    reactions: [],
  };
};
