import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StreamersModule } from './streamers/streamers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StreamersModule,
  ],
})
export class AppModule {}
