import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// process.cwd() 기반의 절대경로를 적용하여 로컬/배포 모두에서 안정적인 위치 확보
const swaggerDocsPath = path.join(process.cwd(), 'src/swagger/docs/**/*.yaml');

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
  apis: [swaggerDocsPath],
};

const swaggerSpec = swaggerJSDoc(options);

// Vercel 배포 환경 정적 파일 404 방지용 CDN 옵션
const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js',
  ],
};

export { swaggerOptions, swaggerSpec, swaggerUI };
