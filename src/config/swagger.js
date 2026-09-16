import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

const loadYaml = (relativePath) => {
  try {
    // 1순위: process.cwd() 기준 탐색
    let fullPath = path.join(process.cwd(), relativePath);
    if (!fs.existsSync(fullPath)) {
      // 2순위: 상대 경로 보완 탐색
      fullPath = path.resolve(relativePath);
    }

    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      return YAML.parse(fileContent) || {};
    }
  } catch (error) {
    console.error(`YAML Load Error (${relativePath}):`, error);
  }
  return {};
};

// 개별 YAML 스펙 직접 로드
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

export { swaggerSpec, swaggerUi };