import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { StreamerEntity } from './streamer.entity';
import { ChzzkModule } from '../platforms/chzzk/chzzk.module';
import { SoopModule } from '../platforms/soop/soop.module';

@Module({
  imports: [TypeOrmModule.forFeature([StreamerEntity]), ChzzkModule, SoopModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
