import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { StreamersService } from './streamers.service';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Get()
  findAll() {
    return this.streamersService.findAll();
  }

  @Post()
  create(@Body() body: { platform: 'chzzk' | 'soop'; channelId: string; name: string }) {
    return this.streamersService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.streamersService.remove(id);
  }
}
