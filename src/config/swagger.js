import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// process.cwd() 기반의 절대 경로 생성
const docsDir = path.join(process.cwd(), 'src/swagger/docs');

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

  apis: ['src/swagger/docs/**/*.yaml', 'src/swagger/docs/**/*.yml'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js',
  ],
};

export { swaggerOptions, swaggerSpec, swaggerUI };
