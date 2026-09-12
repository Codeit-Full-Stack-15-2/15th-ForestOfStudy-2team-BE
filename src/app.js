import { errorHandler } from '#src/middlewares/error-handler.middleware.js';
import { logger } from '#src/middlewares/logger.js';
import cors from 'cors';
import express from 'express';
import { isDevelopment } from './config/config.js';
import { router } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

if (isDevelopment) {
  app.use(logger);
}
app.use('/api', router);
// vercel-heath-check
app.get('/', (req, res) => res.send('API Server is successfully running!'));
app.use(errorHandler);

export default app;
