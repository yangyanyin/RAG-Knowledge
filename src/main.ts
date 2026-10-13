import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { existsSync } from 'node:fs';


// 加载 .env 里的环境变量（Node 内置能力，不用额外装包）
if (existsSync('.env')) {
  process.loadEnvFile();
}
console.log('test 111')

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
    
  });
  // app.enableCors({
  //   origin: [
  //     'https://quickstart-25b84c4b.myshopify.com', // 店铺默认域名
  //   ],
  //   methods: ['GET', 'POST', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type'],s
  // });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
