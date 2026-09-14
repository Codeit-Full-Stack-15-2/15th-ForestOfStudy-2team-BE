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

export const findStudies = async (keyword, orderBy) => {
  const searchCondition = keyword
    ? {
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            nickname: {
              contains: keyword,
            },
          },
        ],
      }
    : {};

  let sortCondition;

  if (orderBy === 'latest') {
    sortCondition = { createdAt: 'desc' };
  } else if (orderBy === 'oldest') {
    sortCondition = { createdAt: 'asc' };
  } else if (orderBy === 'highPoints') {
    sortCondition = { point: 'desc' };
  } else if (orderBy === 'lowPoints') {
    sortCondition = { point: 'asc' };
  }

  return await prisma.study.findMany({
    where: {
      deletedAt: null,
      ...searchCondition,
    },
    orderBy: sortCondition,
    select: {
      id: true,
      nickname: true,
      title: true,
      description: true,
      background: true,
      point: true,
      createdAt: true,
    },
  });
};

export const findStudyById = async (studyId) => {
  const numericId = Number(studyId);

  const [study, reactionRecords] = await Promise.all([
    prisma.study.findFirst({
      where: {
        id: numericId,
        deletedAt: null,
      },
    }),
    prisma.studyReaction.findMany({
      where: {
        studyId: numericId,
        deletedAt: null,
      },
      select: {
        emoji: true,
        guestUuid: true,
      },
    }),
  ]);

  if (!study) return null;

  const reactionMap = reactionRecords.reduce((acc, record) => {
    const { emoji, guestUuid } = record;

    if (!acc[emoji]) {
      acc[emoji] = {
        emoji,
        totalCount: 0,
        guestUuids: [],
      };
    }

    acc[emoji].totalCount += 1;
    acc[emoji].guestUuids.push(guestUuid);

    return acc;
  }, {});

  const reactions = Object.values(reactionMap);

  return {
    ...study,
    reactions,
  };
};

export const createReaction = async (data) => {
  const reaction = await prisma.studyReaction.create({
    data: {
      studyId: Number(data.studyId),
      emoji: data.emoji,
      guestUuid: data.guestUuid,
    },
  });
  return reaction;
};

export const findActiveReaction = async ({ studyId, emoji, guestUuid }) => {
  const reaction = prisma.studyReaction.findFirst({
    where: {
      studyId,
      emoji,
      guestUuid,
      deletedAt: null,
    },
  });
  return reaction;
};

export const softDeleteReaction = async (reactionId) => {
  const reaction = prisma.studyReaction.update({
    where: { id: reactionId },
    data: { deletedAt: new Date() },
  });
  return reaction;
};

export const findActiveStudyOnly = async (studyId) => {
  return prisma.study.findFirst({
    where: {
      id: Number(studyId),
      deletedAt: null,
    },
    select: { id: true },
  });
};

export const updateStudyDeletedAt = async (studyId) => {
  const study = prisma.study.update({
    where: { id: Number(studyId) },
    data: { deletedAt: new Date() },
  });

  return study;
};

export const findActiveStudyWithPoint = async (studyId) => {
  return prisma.study.findFirst({
    where: { id: Number(studyId), deletedAt: null },
    select: { id: true, point: true },
  });
};

export const updateStudyPoint = async (studyId, point) => {
  const study = prisma.study.update({
    where: { id: Number(studyId) },
    data: { point },
  });

  return study;
};
