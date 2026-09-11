import { Router } from 'express';
import { habitRepository } from '../../repositories/habitl.repository.js';
import { HTTP_STATUS } from 

export const habitRoute = Router();

habitRoute.post('/', async (req, res, next)=>{
 try{
  const habits = await habitRepository.habits.create({
    data: {
      title: "물 마시기",
    },
  });
  res.status(201).json(habits);
 }catch (error){
  next(error);
 }
});

habitRoute.patch('/:habit_id', async (req, res, next) => {
try{
   const habit = await habitRepository.update(req.params.habit_id, req.body);
 return res.status(200).json(habit);
}
catch (error){
  next(error);
 }
});

habitRoute.delete('/:habit_id', async (req, res, next) => {
  try{
 await habitRepository.remove(req.params.habit_id);
  return res.sendStatus(HTTP_STATUS.NO_CONTENT);
  }
  catch (error){
  next(error);
 }
   
});
