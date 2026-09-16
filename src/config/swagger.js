import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

// 안전하게 YAML 파일을 읽어오는 헬퍼 함수
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

// 개별 YAML 스펙 직접 로드
const healthSpec = loadYaml('src/swagger/docs/health.yaml');
// 다른 YAML 파일이 있다면 추가 (예: const habitsSpec = loadYaml('src/swagger/docs/habits.yaml');)

// Swagger Spec 객체 정밀 직접 수동 구성
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
    // ...(habitsSpec.paths || {}),
  },
  components: {
    ...(healthSpec.components || {}),
  },
};

export { swaggerSpec, swaggerUi };
