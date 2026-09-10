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

export const findStudyById = async (studyId) => {
  const numericId = Number(studyId);

  const [study, reactionGroups] = await Promise.all([
    prisma.study.findFirst({
      where: {
        id: numericId,
        deletedAt: null,
      },
    }),
    prisma.studyReaction.groupBy({
      by: ['emoji'],
      where: {
        studyId: numericId,
        deletedAt: null,
      },
      _count: {
        emoji: true,
      },
    }),
  ]);

  if (!study) return null;

  const reactions = reactionGroups.map((group) => ({
    emoji: group.emoji,
    totalCount: group._count.emoji,
  }));
  console.log({
    ...study,
    reactions,
  });
  return {
    ...study,
    reactions,
  };
};
