import { prisma } from '#src/db/prisma.js';

export const createHabit = async (studyId, titles) => {
  const createPromises = titles.map((title) =>
    prisma.habit.create({
      data: {
        studyId: Number(studyId),
        title: title,
      },
    }),
  );
  return await Promise.all(createPromises);
};

export const findHabits = async (studyId, startDate, endDate) => {
  const recordWhere = {};
  if (startDate) recordWhere.gte = new Date(startDate);
  if (endDate) recordWhere.lte = new Date(endDate);

  const recordsWhereClause = {};

  if (Object.keys(recordWhere).length > 0) {
    recordsWhereClause.recordDate = recordWhere;
  }

  return await prisma.habit.findMany({
    where: {
      studyId: Number(studyId),
      deletedAt: null,
    },
    include: {
      records: {
        where:
          Object.keys(recordsWhereClause).length > 0
            ? recordsWhereClause
            : undefined,
      },
    },
  });
};

export const findHabitsByIds = async (habitIds) => {
  return await prisma.habit.findMany({
    where: {
      id: { in: habitIds.map((id) => Number(id)) },
      deletedAt: null,
    },
  });
};

export const updateHabits = async (habitsData) => {
  const updatePromises = habitsData.map((habit) => {
    return prisma.habit.updateMany({
      where: { id: Number(habit.id), deletedAt: null },
      data: {
        title: habit.title,
      },
    });
  });

  const updatedHabits = await Promise.all(updatePromises);
  return updatedHabits;
};

export const softDeleteRecordsByHabitIdsAndDate = async (
  habitIds,
  recordDate,
) => {
  return await prisma.habitRecord.updateMany({
    where: {
      habitId: { in: habitIds.map((id) => Number(id)) },
      recordDate: new Date(recordDate),
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const removehabits = async (habitIds) => {
  return await prisma.habit.updateMany({
    where: { id: { in: habitIds.map((id) => Number(id)) }, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};

export const toggleHabitRecord = async (habitId, recordDate) => {
  const numHabitId = Number(habitId);
  const formattedDate = new Date(recordDate);

  const existingRecord = await prisma.habitRecord.findUnique({
    where: {
      habitId_recordDate: {
        habitId: numHabitId,
        recordDate: formattedDate,
      },
    },
  });

  // 1) 기록이 없으면 생성 (체크 완료)
  if (!existingRecord) {
    return await prisma.habitRecord.create({
      data: {
        habitId: numHabitId,
        recordDate: formattedDate,
      },
    });
  }
  // 해제된 상태면 null로 복구 (체크 완료)
  if (existingRecord.deletedAt !== null) {
    return await prisma.habitRecord.update({
      where: { id: existingRecord.id },
      data: { deletedAt: null },
    });
  }
  // 3) 체크된 상태면 deletedAt 업데이트 (체크 해제)
  return await prisma.habitRecord.update({
    where: { id: existingRecord.id },
    data: { deleteAt: new Date() },
  });
};

export const findHabitsWithRecordsByStudyIdAndDateRange = async (
  studyId,
  startDate,
  endDate,
  page = 1,
  pageSize = 7,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);

  const whereCondition = {
    studyId: Number(studyId),
    OR: [
      {
        deletedAt: null,
      },
      {
        records: {
          some: {
            deletedAt: null,
            recordDate: {
              gte: start,
              lte: end,
            },
          },
        },
      },
    ],
  };

  const [totalCount, habitRecords] = await prisma.$transaction([
    prisma.habit.count({
      where: whereCondition,
    }),
    prisma.habit.findMany({
      where: whereCondition,
      include: {
        records: {
          where: {
            deletedAt: null,
            recordDate: {
              gte: start,
              lte: end,
            },
          },
          orderBy: {
            recordDate: 'asc',
          },
        },
      },
      skip,
      take,
      orderBy: {
        id: 'asc',
      },
    }),
  ]);

  return { totalCount, habits: habitRecords };
};
