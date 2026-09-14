import { NotFoundException } from '#src/errors/not-found-exception.js';
import { ERROR_MESSAGES } from '../constants/index.js';
import * as habitRepository from '#src/repositories/habit.repository.js';
import * as studyRepository from '#src/repositories/study.repository.js';
import { BadRequestException } from '#src/errors/bad-request-exception.js';

export const createHabitsService = async (studyId, titles) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const newHabits = await habitRepository.createHabit(studyId, titles);

  return newHabits.map((habit) => ({
    ...habit,
    id: habit.id.toString(),
    studyId: habit.studyId.toString(),
  }));
};

export const getHabitsService = async (studyId, targetDate) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  const date = targetDate ? new Date(targetDate) : new Date();
  const startDate = new Date(date.setHours(0, 0, 0, 0));
  const endDate = new Date(date.setHours(23, 59, 59, 999));

  const habits = await habitRepository.findHabits(studyId, startDate, endDate);

  if (!habits || habits.length === 0) {
    return [];
  }

  return habits.map((habit) => ({
    id: habit.id.toString(),
    studyId: habit.studyId.toString(),
    title: habit.title,
    createdAt: habit.createdAt,
    records: habit.records.map((record) => ({
      id: record.id.toString(),
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
  const habitIds = habitsData.map((h) => BigInt(h.id));
  const existingHabits = await habitRepository.findHabitsByIds(habitIds);

  if (existingHabits.length !== habitsData.length) {
    throw new NotFoundException(ERROR_MESSAGES.HABIT_NOT_FOUND);
  }

  const isInvalidStudy = existingHabits.some(
    (habit) => habit.studyId !== BigInt(studyId),
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
  return updateHabits.map((habit) => ({
    ...habit,
    id: habit.id.toString(),
    studyId: habit.studyId.toString(),
  }));
};

export const deleteHabitsService = async (studyId, habitIds) => {
  const study = await studyRepository.findStudyById(studyId);
  if (!study) {
    throw new NotFoundException(ERROR_MESSAGES.STUDY_NOT_FOUND);
  }

  //2. 삭제할 습관들이 DB에 유효하게 존재하는지 확인 (deletedAt: null인 항목만)
  const bigIntHabitIds = habitIds.map((id) => BigInt(id));
  const existingHabits = await habitRepository.findHabitsByIds(bigIntHabitIds);

  if (existingHabits.length !== habitIds.length) {
    throw new NotFoundException(ERROR_MESSAGES.HABIT_NOT_FOUND);
  }

  const isInvalidStudy = existingHabits.some(
    (habit) => habit.studyId !== BigInt(studyId),
  );
  if (isInvalidStudy) {
    throw new BadRequestException(
      '해당 스터디에 속하지 않은 습관이 포함되어 있습니다.',
    );
  }

  const result = await habitRepository.removehabits(bigIntHabitIds);

  return {
    deletedCount: result.count,
  };
};
