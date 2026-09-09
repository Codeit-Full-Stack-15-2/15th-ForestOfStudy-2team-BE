import express from 'express';
import { habitRoute } from './habits/habit.route.js';
import { studyRoute } from './studies/study.route.js';

export const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: new Date() });
});

router.use('/studies', studyRoute);
router.use('/habits', habitRoute);
