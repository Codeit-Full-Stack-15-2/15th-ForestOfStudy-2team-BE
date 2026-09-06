import express from "express";
import cors from "cors";
import { config, isDevelopment } from "./config/config.js";
import { router } from "#src/routes/index.js";
import { logger } from "#src/middlewares/logger.js";
import { errorHandler } from "#src/middlewares/error-handler.js";

const app = express();

app.use(cors()); 
app.use(express.json());

if (isDevelopment) {
  app.use(logger);
}

app.use("/", router);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀 Server is listening on port ${config.PORT}`);
});
