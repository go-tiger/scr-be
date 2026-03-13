import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StreamersModule } from './streamers/streamers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    StreamersModule,
  ],
})
export class AppModule {}
