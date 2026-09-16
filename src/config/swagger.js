import fs from 'fs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';

// Vercel 서버리스 환경에서도 확실하게 YAML을 읽어오는 안전 로드 함수
const loadYamlDocs = () => {
  const docsDir = path.join(process.cwd(), 'src/swagger/docs');
  const combinedPaths = {};
  const combinedComponents = {};

  try {
    if (fs.existsSync(docsDir)) {
      const files = fs.readdirSync(docsDir);
      files.forEach((file) => {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          const filePath = path.join(docsDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const parsed = YAML.parse(fileContent);
          if (parsed) {
            if (parsed.paths) Object.assign(combinedPaths, parsed.paths);
            if (parsed.components)
              Object.assign(combinedComponents, parsed.components);
          }
        }
      });
    }
  } catch (error) {
    console.error('Swagger YAML 로딩 실패:', error);
  }

  return { paths: combinedPaths, components: combinedComponents };
};

const { paths, components } = loadYamlDocs();

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
  paths,
  components,
};

// Vercel 정적 자원 404 차단용 CDN 옵션
const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js',
  ],
};

export { swaggerOptions, swaggerSpec, swaggerUI };
