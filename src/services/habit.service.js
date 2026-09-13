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

  const newHabit = await habitRepository.createHabit(studyId, titles);
  return newHabit;
};

export const getHabitsService = async (studyId) => {
  const habits = await habitRepository.findHabits(studyId);

  return habits.map((habit) => ({
    id: habit.id,
    studyId: habit.studyId,
    title: habit.title,
    createdAt: habit.createdAt,
    records: habit.records.map((record) => ({
      id: record.id,
      recordData: record.recordData,
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

  if(existingHabits.length !== habitsData.length){
    throw new NotFoundException(ERROR_MESSAGES.HABIT_NOT_FOUND);
  }

  const isInvalidStudy = existingHabits.some(
    (habit) => habit.study_id !== BigInt(studyId)
  );
  if (isInvalidStudy){
    throw new BadRequestException('해당 스터디에 속하지 않은 습관이 포함되어 있습니다.');
  }

  const updateHabits = await habitRepository.updateHabits(habitsData);
  return updateHabits.map((habit) => ({
    ...habit,
    id: habit.id.toString(),
    study_id: habit.study_id.toString(),
  }));
};

export const deleteHabitsService = async (habitsData) => {
  const deletedHabits = await habitRepository.removehabits(habitsData);
  return deletedHabits;
};
