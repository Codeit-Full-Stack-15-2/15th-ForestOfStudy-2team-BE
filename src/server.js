import app from './app.js';
import { config, isProduction } from './config/config.js';

if (!isProduction) {
  app.listen(config.PORT, () => {
    console.log(`🚀 Server is listening on port ${config.PORT}`);
  });
}
