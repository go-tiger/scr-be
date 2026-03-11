import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SoopService } from './soop.service';

@Module({
  imports: [HttpModule],
  providers: [SoopService],
  exports: [SoopService],
})
export class SoopModule {}
