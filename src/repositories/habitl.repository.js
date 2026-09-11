import { prisma } from "#db/prisma.js";


function create(data){
  return prisma.habits.create({data});
}

function update(habit_id, data) {
  return prisma.habit.update({
    where: { id: Number(habit_id) },
    data,
  });
}

function remove(habit_id) {
  return prisma.habit.delete({
    where: { id: Number(habit_id) },
  });
}

export const  habitRepository ={
  create,
  update,
  remove,
};