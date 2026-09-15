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

  return await prisma.habit.findMany({
    where: {
      studyId: Number(studyId),
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

export const removehabits = async (habitIds) => {
  return await prisma.habit.updateMany({
    where: { id: { in: habitIds.map((id) => Number(id)) }, deletedAt: null },
    data: { deletedAt: new Date() },
  });
};

export const toggleHabitRecord = async (habitId, recordDate, isComplete) => {
  const formattedDate = new Date(recordDate);

  return await prisma.habitRecord.upsert({
    where: {
      habitId_recordDate: {
        habitId: Number(habitId),
        recordDate: formattedDate,
      },
    },
    update: { isComplete },
    create: {
      habitId: Number(habitId),
      recordDate: formattedDate,
      isComplete,
    },
  });
};

export const findHabitsWithRecordsByStudyIdAndDateRange = async (
  studyId,
  start,
  end,
) => {};
