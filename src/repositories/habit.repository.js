import { prisma } from '#src/db/prisma.js';
import dayjs from '#src/utils/dayjs.js';

export const createHabit = async (studyId, titles) => {
  const createdHabits = [];

  for (const title of titles) {
    const habit = await prisma.habit.create({
      data: {
        studyId: Number(studyId),
        title: title,
      },
    });
    createdHabits.push(habit);
  }
  return createdHabits;
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
    orderBy: {
      id: 'asc',
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

export const findActiveHabitsByTitles = async (studyId, titles) => {
  return await prisma.habit.findMany({
    where: {
      studyId: Number(studyId),
      title: { in: titles },
      deletedAt: null,
    },
    select: { title: true },
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

export const removehabits = async (studyId, habitIds) => {
  if (!Array.isArray(habitIds) || habitIds.length === 0) {
    return { count: 0 };
  }

  const numericHabitIds = habitIds.map((id) => Number(id));
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDate = new Date(`${todayStr}T00:00:00.000Z`);

  return await prisma.$transaction([
    prisma.habit.updateMany({
      where: {
        id: { in: numericHabitIds },
        studyId: Number(studyId),
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    }),
    //오늘 자 체크 기록(habitRecord)도 삭제 처리 (오늘 조회 시 OR 조건에 걸리지 않도록 함)
    //과거 날짜의 habitRecord는 deletedAt: null 상태로 유지되어 이전 기록에 영향을 주지 않음
    prisma.habitRecord.updateMany({
      where: {
        habitId: { in: numericHabitIds },
        recordDate: todayDate,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    }),
  ]);
};

export const toggleHabitRecord = async (habitId, recordDate) => {
  const numHabitId = Number(habitId);
  const dateOnly =
    typeof recordDate === 'string' ? recordDate.split('T')[0] : recordDate;
  const formattedDate = new Date(`${dateOnly}T00:00:00.000Z`);

  // 기존 레코드가 있는지 확인
  const existingRecord = await prisma.habitRecord.findUnique({
    where: {
      habitId_recordDate: {
        habitId: numHabitId,
        recordDate: formattedDate,
      },
    },
  });

  //  기록이 없으면 생성 / 있으면 deletedAt 토글 처리 (upsert)
  return await prisma.habitRecord.upsert({
    where: {
      habitId_recordDate: {
        habitId: numHabitId,
        recordDate: formattedDate,
      },
    },
    update: {
      deletedAt: existingRecord?.deletedAt ? null : new Date(),
    },

    create: {
      habitId: numHabitId,
      recordDate: formattedDate,
    },
  });
};

export const findHabitsWithRecordsByStudyIdAndDateRange = async (
  studyId,
  startDate,
  endDate,
  page = 1,
  pageSize = 7,
) => {
  const start = dayjs(startDate).startOf('day').toDate();
  const end = dayjs(endDate).endOf('day').toDate();

  const skip = (Number(page) - 1) * Number(pageSize);
  const take = Number(pageSize);

  const whereCondition = {
    studyId: Number(studyId),
    OR: [
      // Case 1: 삭제되지 않은 활성 습관
      { deletedAt: null },
      // Case 2: 삭제된 습관이더라도 지정된 기간(Today 포함) 내에 작성된 기록이 존재하는 경우
      // (records의 deletedAt 조건 제거하여 부모가 삭제될 때 기록이 같이 Soft Delete되어도 조회 가능하게 수정)
      {
        records: {
          some: {
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
