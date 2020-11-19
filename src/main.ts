import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// until we need formdata 
// var multer = require('multer');
// var upload = multer();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(upload.array())
  await app.listen(3000);
  Logger.log(`Server running on port ${3000}`, 'bootstrap')
}
bootstrap();
