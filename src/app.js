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
