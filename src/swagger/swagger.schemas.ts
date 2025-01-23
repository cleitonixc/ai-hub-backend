import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ErrorSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      example: 400,
    },
    message: {
      type: 'string',
      example: 'Mensagem de erro',
    },
    error: {
      type: 'string',
      example: 'Bad Request',
    },
  },
};

export const UnauthorizedSchema: SchemaObject = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      example: 401,
    },
    message: {
      type: 'string',
      example: 'Não autorizado',
    },
  },
}; 