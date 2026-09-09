import { errorHandler } from '#src/middlewares/error-handler.middleware.js';
import { logger } from '#src/middlewares/logger.js';
import cors from 'cors';
import express from 'express';
import { config, isDevelopment } from './config/config.js';
import { router } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

if (isDevelopment) {
  app.use(logger);
}

app.use('/api', router);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀 Server is listening on port ${config.PORT}`);
});
