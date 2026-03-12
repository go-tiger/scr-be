import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamersModule } from './streamers/streamers.module';
import { StreamerEntity } from './streamers/streamer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [StreamerEntity],
      synchronize: true,
    }),
    StreamersModule,
  ],
})
export class AppModule {}
