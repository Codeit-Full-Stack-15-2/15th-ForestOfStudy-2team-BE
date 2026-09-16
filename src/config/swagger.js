import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';

const getYamlDocs = () => {
  const docsDir = path.join(process.cwd(), 'src/swagger/docs');
  const combinedPaths = {};
  const combinedComponents = { schemas: {} };

  try {
    if (fs.existsSync(docsDir)) {
      const files = fs.readdirSync(docsDir);
      files.forEach((file) => {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          const filePath = path.join(docsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const parsed = YAML.parse(content);

          if (parsed) {
            // 1. paths 매핑: parsed.paths가 있으면 사용하고, 없으면 루트 키가 경로(/)인 것들을 병합
            if (parsed.paths) {
              Object.assign(combinedPaths, parsed.paths);
            } else {
              Object.keys(parsed).forEach((key) => {
                if (key.startsWith('/')) {
                  combinedPaths[key] = parsed[key];
                }
              });
            }

            // 2. components 매핑
            if (parsed.components) {
              if (parsed.components.schemas) {
                Object.assign(
                  combinedComponents.schemas,
                  parsed.components.schemas,
                );
              }
              Object.assign(combinedComponents, parsed.components);
            }
          }
        }
      });
    }
  } catch (err) {
    console.error('YAML 파싱 실패:', err);
  }

  return { combinedPaths, combinedComponents };
};

const { combinedPaths, combinedComponents } = getYamlDocs();

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
    paths: combinedPaths,
    components: combinedComponents,
  },
  apis: [],
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
