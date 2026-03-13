import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { AppModule } from './app.module';

class TzLogger extends ConsoleLogger {
  protected getTimestamp(): string {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Seoul',
      hour12: false,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new TzLogger() });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
