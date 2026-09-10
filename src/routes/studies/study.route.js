import { Router } from 'express';
import { prisma } from '#src/db/prisma.js';

export const studyRoute = Router();

studyRoute.post('/', async (req, res, next) => {
  try {
    const study = await prisma.study.create({
      data: {
        nickname: '테스트 유저',
        title: 'Prisma 테스트',
        description: 'DB 저장 테스트입니다.',
        background: 'blue',
        studyPassword: '1234',
      },
    });

    res.status(201).json(study);
  } catch (error) {
    next(error);
  }
});
