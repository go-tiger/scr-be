import { Injectable } from '@nestjs/common';
import { ChzzkService } from '../platforms/chzzk/chzzk.service';
import { SoopService } from '../platforms/soop/soop.service';

@Injectable()
export class StreamersService {
  constructor(
    private readonly chzzkService: ChzzkService,
    private readonly soopService: SoopService,
  ) {}
}
