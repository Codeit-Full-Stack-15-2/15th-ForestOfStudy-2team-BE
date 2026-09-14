import { BadRequestException } from '#src/errors/bad-request-exception.js';
import { NotFoundException } from '#src/errors/not-found-exception.js';
import * as habitRepository from '#src/repositories/habit.repository.js';
import * as studyRepository from '#src/repositories/study.repository.js';
import dayjs from '#src/utils/dayjs.js';
import { ERROR_MESSAGES } from '../constants/index.js';

export const createHabitsService = async (studyId, titles) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const newHabits = await habitRepository.createHabit(Number(studyId), titles);

  return newHabits;
};

export const getHabitsService = async (studyId, targetDate) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const baseDate = targetDate ? new Date(targetDate) : new Date();
  const startDate = new Date(baseDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(baseDate);
  endDate.setHours(23, 59, 59, 999);

  const habits = await habitRepository.findHabits(
    Number(studyId),
    startDate,
    endDate,
  );

  if (!habits || habits.length === 0) {
    return [];
  }

  return habits.map((habit) => ({
    id: habit.id,
    studyId: habit.studyId,
    title: habit.title,
    createdAt: habit.createdAt,
    records: habit.records.map((record) => ({
      id: record.id,
      recordDate: record.recordDate,
      isComplete: record.isComplete,
    })),
  }));
};

export const updateHabitsService = async (studyId, habitsData) => {
  const study = await studyRepository.findStudyById(studyId);

  // 스터디 존재 여부 확인
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  //수정 대상 습관들이 해당 스터디에 실제 속해있는지 확인
  const habitIds = habitsData.map((h) => Number(h.id));
  const existingHabits = await habitRepository.findHabitsByIds(habitIds);

  if (existingHabits.length !== habitsData.length) {
    throw new NotFoundException(ERROR_MESSAGES.HABIT_NOT_FOUND);
  }

  const isInvalidStudy = existingHabits.some(
    (habit) => habit.studyId !== Number(studyId),
  );
  if (isInvalidStudy) {
    throw new BadRequestException(
      '해당 스터디에 속하지 않은 습관이 포함되어 있습니다.',
    );
  }

  //실제 수정 실행 함수 호출
  await habitRepository.updateHabits(habitsData);

  //습관 일관 수정
  const updateHabits = await habitRepository.findHabitsByIds(habitIds);

  // 수정된 최신 습관 목록 다시 조회하여 반환
  return updateHabits;
};

export const deleteHabitsService = async (studyId, habitIds) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  //2. 삭제할 습관들이 DB에 유효하게 존재하는지 확인 (deletedAt: null인 항목만)
  const targetHabitIds = habitIds.map((id) => Number(id));
  const existingHabits = await habitRepository.findHabitsByIds(targetHabitIds);

  if (existingHabits.length !== habitIds.length) {
    throw new NotFoundException(ERROR_MESSAGES.HABIT_NOT_FOUND);
  }

  const isInvalidStudy = existingHabits.some(
    (habit) => habit.studyId !== Number(studyId),
  );
  if (isInvalidStudy) {
    throw new BadRequestException(
      '해당 스터디에 속하지 않은 습관이 포함되어 있습니다.',
    );
  }

  const result = await habitRepository.removehabits(targetHabitIds);

  return {
    deletedCount: result.count,
  };
};

export const getWeeklyRecords = async (studyId, targetDate) => {
  const numericStudyId = Number(studyId);
  const base = dayjs.tz(targetDate);

  const startDate = base.startOf('isoWeek').format('YYYY-MM-DD');
  const endDate = base.endOf('isoWeek').format('YYYY-MM-DD');

  const habits =
    await habitRepository.findHabitsWithRecordsByStudyIdAndDateRange(
      numericStudyId,
      startDate,
      endDate,
    );

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    base.startOf('isoWeek').add(i, 'day').format('YYYY-MM-DD'),
  );

  const formattedHabits = habits.map((habit) => {
    const weeklyRecords = weekDays.map((dateStr) => {
      const foundRecord = habit.records.find(
        (rec) => dayjs.tz(rec.recordDate).format('YYYY-MM-DD') === dateStr,
      );

      return {
        date: dateStr,
        record: foundRecord || null,
      };
    });

    return {
      ...habit,
      weeklyRecords,
    };
  });

  return formattedHabits;
};
