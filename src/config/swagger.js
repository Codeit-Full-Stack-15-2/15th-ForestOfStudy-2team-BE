import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
  apis: [path.join(process.cwd(), 'src/swagger/docs/**/*.yaml')],
};

const swaggerSpec = swaggerJSDoc(options);

// CDN 경로를 unpkg의 가장 안정적인 버전으로 변경
const swaggerOptions = {
  customCssUrl: 'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css',
  customJs: [
    'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
    'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js',
  ],
};

export const swaggerUI = swaggerUi;
export { swaggerOptions, swaggerSpec };
