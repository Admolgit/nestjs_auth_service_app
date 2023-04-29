import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/microservice')
  app.enableCors({
    origin: 'http://localhost:4200'
  })
  await app.listen(8002);
}
bootstrap();
