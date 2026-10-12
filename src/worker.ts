import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { httpServerHandler } from 'cloudflare:node';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

export default httpServerHandler({ port: 3000 });