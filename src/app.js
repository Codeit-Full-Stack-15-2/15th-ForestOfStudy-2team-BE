import { errorHandler } from '#src/middlewares/error-handler.middleware.js';
import { logger } from '#src/middlewares/logger.js';
import cors from 'cors';
import express from 'express';
import { isDevelopment } from './config/config.js';
import { router } from './routes/index.js';
import { swaggerUI,swaggerSpec } from '#src/swagger/swagger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

if (isDevelopment) {
  app.use(logger);
}

app.use('/api', router);
app.use(errorHandler);

export { app };
