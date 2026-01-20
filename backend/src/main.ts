import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startTelegramBot } from './telegram/telegram.bot';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server started on port ${port}`);
}

bootstrap();
await app.listen(3000);
startTelegramBot();


