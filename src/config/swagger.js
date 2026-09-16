import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ForestOfStudy',
      description: '공부의 숲 API입니다',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/api`
          : `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'API 서버',
      },
    ],
  },
  apis: [
    path.join(process.cwd(), 'src/swagger/docs/**/*.yaml'),
    path.join(__dirname, '../swagger/docs/**/*.yaml'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js',
  ],
};

export const swaggerUI = swaggerUi;
export { swaggerOptions, swaggerSpec };
