import * as habitRepository from '#src/repositories/habit.repository.js';

export const getWeeklyRecords = async (studyId, targetDate) => {
  const numericStudyId = Number(studyId);

  const weeklyHabitRecords =
    await habitRepository.findHabitsWithRecordsByStudyIdAndDateRange(
      numericStudyId,
      start,
      end,
    );

  return weeklyHabitRecords;
};
