import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChzzkService } from './chzzk.service';

@Module({
  imports: [HttpModule],
  providers: [ChzzkService],
  exports: [ChzzkService],
})
export class ChzzkModule {}
