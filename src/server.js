import http from 'http';
import handler from './app.js';
import { config, isProduction } from './config/config.js';

if (!isProduction) {
  // handler 함수를 통째로 서버의 콜백으로 넘깁니다.
  http.createServer(handler).listen(config.PORT, () => {
    console.log(`🚀 Server is listening on port ${config.PORT}`);
  });
}
