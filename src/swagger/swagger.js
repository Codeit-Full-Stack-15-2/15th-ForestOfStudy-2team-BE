import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';


const options = {
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'ForestOfStudy',
            description: '공부의 숲 API입니다',
            version: '1.0.0',
        },
        servers: [
            {url: `http://localhost:${process.env.PORT}/api`, description: ''} 
        ],
    },
        apis: ['./src/swagger/docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export {swaggerUI, swaggerSpec}