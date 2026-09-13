import * as habitService from '#src/services/habit.service.js';
import * as studyService from '#src/services/study.service.js';
import { HTTP_STATUS } from '../constants';

export const getHabits = async (req, res, next) => {
  const studyId = req.validate.params.study_id;

  const habits = await habitService.getHabitsService(req.validate.params);
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: habits,
    message: '습관 목록을 가져오는데 성공했습니다.'

  })
};

export const createHabits = async (req, res, next) => {
 const {study_id} = req.params;
 const {titles} = req.validate.body;
 
  const newHabit = await habitService.createHabitsService(req.validate.body);
  res.status(HTTP_STATUS.CREATE).json({
    success: true,
    data: newHabit,
    message: '습관이 생성되었습니다.',
  });
};

export const updateHabits = async (req, res, next) => {
 try{
const {study_id} = req.validated.params;
const {habits} = req.validated.body;

  const updateHabits = await habitService.updateHabitsService(
    study_id,
    habits,
  );
  
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: updateHabits,
    message: '습관을 성공적으로 수정했습니다.'
  });
 } catch (error){
  next(error);
 }
  
};


export const deleteHabits = (req, res, next) => {};
