import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Autenticação')
    .setDescription('Documentação da API de autenticação e gerenciamento de usuários')
    .setVersion('1.0')
    .addTag('Autenticação', 'Endpoints relacionados à autenticação')
    .addTag('Usuários', 'Endpoints relacionados aos usuários')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT',
      },
      'access-token',
    )
    .addServer('http://localhost:8080', 'Servidor Local')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(8080);
}
bootstrap();
