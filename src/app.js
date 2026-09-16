import { errorHandler } from '#src/middlewares/error-handler.middleware.js';
import { logger } from '#src/middlewares/logger.js';
// import { swaggerUI } from '#src/swagger/swagger.js';
import cors from 'cors';
import express from 'express';
import { isDevelopment } from './config/config.js';
import { swaggerOptions, swaggerSpec, swaggerUI } from './config/swagger.js';
import { router } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
// CDN 옵션(swaggerOptions)을 함께 바인딩하여 정적 파일 서빙 문제 차단
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerOptions),
);

if (isDevelopment) {
  app.use(logger);
}
app.use('/api', router);
// vercel-heath-check
app.get('/', (req, res) => {
  const pikachu = `
quu..__
 $$$b   \`---.__
  "$$b         \`--.                           ___.---uuudP
   \`$$b            \`.__.------.__     __.---'      $$$$"              .
     "$b          -'            \`-.-'            $$$"              .'|
       ".                                       d$"              _.'  |
         \`.   /                               ..."              .'     |
           \`./                           ..::-'             _.'       |
            /                         .:::-'            .-'         .'
           :                          ::''\\          _.'            |
          .' .-.             .-.            \`.      .'                |
          : /'$$|           .@"$\\            \`.   .'              _.-'
         .'|$u$$|          |$$,$$|            |  <             _.-'
         | \`:$$:'          :$$$$$:            \`.  \`.        .-'
         :                  \`"--'              |    \`-.     \\
        :##.       ==             .###.        \`.      \`.    \`\\
        |##:                      :###:        |        >     >
        |#'     \`..'\`..'          \`###'        x:      /     /
         \\                                    xXX|     /    ./
          \\                                 xXXX'|    /   ./
          /\`-.                                   \`.  /   /
         :    \`-  ...........,                    | /  .'
         |         \`\`:::::::'        .            |<    \`.
         |             \`\`\`          |            x| \\ \`.:\`\`.
         |                          .'    /'   xXX|  \`:\`M\`M':.
         |    |                    ;    /:' xXXX'|  -'MMMMM:'
         \`.  .'                    :    /:'       |-'MMMM.-'
          |  |                    .'   /'        .'MMM.-'
          \`'\`'                    :  ,'          |MMM<
            |                      \`'            |tbap\\
             \\                                   :MM.-'
              \\                               |              .''
               \\.               \`.            /
                /     .:::::::.. :           /
               |     .:::::::::::\`.         /
               |   .:::------------\\       /
              /   .''                >::'  /
              \`',:                  :    .'
                                    \`:.:'
`;
  res.send(`
    <pre style="font-family: monospace; font-size: 13px; line-height: 1.1; color: #f59e0b; background-color: #111; padding: 24px; border-radius: 8px; display: inline-block;">
${pikachu}
⚡ Pika-Pika! API Server & Supabase DB are successfully running! ⚡
    </pre>
  `);
});
app.use(errorHandler);

export default app;
