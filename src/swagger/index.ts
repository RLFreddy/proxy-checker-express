import swaggerJsdoc from 'swagger-jsdoc';
import { OAS3Options, OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'API - Proxy-Checker',
    version: '1.0.0',
    description: 'Documentation',
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;