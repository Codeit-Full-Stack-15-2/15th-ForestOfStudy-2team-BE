import fs from 'fs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';

const loadYaml = (relativePath) => {
  try {
    const fullPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      return YAML.parse(fileContent) || {};
    }
  } catch (error) {
    console.error(`YAML Load Error (${relativePath}):`, error);
  }
  return {};
};

const healthSpec = loadYaml('src/swagger/docs/health.yaml');

const swaggerSpec = {
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
  paths: {
    ...(healthSpec.paths || {}),
  },
  components: {
    ...(healthSpec.components || {}),
  },
};

// Vercel 서버리스 환경 완벽 대응을 위한 CDN 옵션 구성
const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js',
  ],
};

export { swaggerOptions, swaggerSpec, swaggerUI };
