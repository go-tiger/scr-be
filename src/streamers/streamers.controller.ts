import { Controller, Get } from '@nestjs/common';
import { StreamersService } from './streamers.service';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Get()
  findAll() {
    return [];
  }
}
