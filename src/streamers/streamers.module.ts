import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { ChzzkModule } from '../platforms/chzzk/chzzk.module';
import { SoopModule } from '../platforms/soop/soop.module';

@Module({
  imports: [ChzzkModule, SoopModule],
  controllers: [StreamersController],
  providers: [StreamersService],
})
export class StreamersModule {}
