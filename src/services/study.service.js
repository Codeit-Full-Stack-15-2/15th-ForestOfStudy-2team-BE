import * as studyRepository from '#src/repositories/study.repository.js';
import bcrypt from 'bcrypt';

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
