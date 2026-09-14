import { prisma } from '#src/db/prisma.js';

export const createHabit = async (studyId, titles) => {
  const createPromises = titles.map((title) =>
    prisma.habit.create({
      data: {
        studyId: BigInt(studyId),
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

  return await prisma.habit.findMany({
    where: {
      studyId: BigInt(studyId),
      deletedAt: null,
    },
    include: {
      records: {
        where:
          Object.keys(recordWhere).length > 0
            ? { recordDate: recordWhere }
            : undefined,
      },
    },
  });
};

export const findHabitsByIds = async (habitIds) => {
  return await prisma.habit.findMany({
    where: {
      id: { in: habitIds.map((id) => BigInt(id)) },
      deletedAt: null,
    },
  });
};

export const updateHabits = async (habitsData) => {
  const updatePromises = habitsData.map((habit) => {
    return prisma.habit.updateMany({
      where: { id: BigInt(habit.id), deletedAt: null },
      data: {
        title: habit.title,
      },
    });
  });

  const updatedHabits = await Promise.all(updatePromises);
  return updatedHabits;
};

export const removehabits = async (habitIds) => {
  await prisma.habit.updateMany({
    where: { id: { in: habitIds.map((id) => BigInt(id)) }, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};

export const upsertHabitRecord = async (habitId, recordDate, isComplete) => {
  return await prisma.habitRecord.upsert({
    where: {
      habitId_recordDate: {
        habitId: BigInt(habitId),
        recordDate: new Date(recordDate),
      },
    },
    update: { isComplete },
    create: {
      habitId: BigInt(habitId),
      recordDate: new Date(recordDate),
      isComplete,
    },
  });
};
