import { prisma } from '#src/db/prisma.js';

export const createHabit = async (studyId, title) => {
  return await prisma.habit.create({
    data: {
      studyId: BigInt(studyId),
      title: title,
    },
  });
};

export const findHabits = async (studyId) => {
  return await prisma.habit.findMany({
    where: {
      studyId: BigInt(studyId),
      deletedAt: null,
    },
    include: { records: true },
  });
};

export const updateHabits = async (habitsData) => {
  const updatePromises = habitsData.map((habit) => {
    return prisma.habit.update({
      where: { id: BigInt(habit.id) },
      data: {
        title: habit.title,
      },
    });
  });

  const updatedHabits = await Promise.all(updatePromises);
  return updatedHabits;
};

export const removehabits = async (studyId) => {
  await prisma.habit.updateMany({
    where: { id: BigInt(studyId), deletedAt: new Date() },
  });
};
