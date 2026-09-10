import { prisma } from '#src/db/prisma.js';

export const createStudyRecord = async (data) => {
  return await prisma.study.create({
    data: {
      nickname: data.nickname,
      title: data.title,
      description: data.description,
      background: data.background,
      studyPassword: data.study_password,
      point: data.point,
    },
  });
};
