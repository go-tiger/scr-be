import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StreamerEntity } from './streamer.entity';
import { StreamerResponseDto } from './dto/streamer.dto';
import { ChzzkService } from '../platforms/chzzk/chzzk.service';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(StreamerEntity)
    private readonly streamerRepo: Repository<StreamerEntity>,
    private readonly chzzkService: ChzzkService,
  ) {}

  async findAll(): Promise<StreamerResponseDto[]> {
    const entities = await this.streamerRepo.find();

    const results = await Promise.all(
      entities.map(async (entity) => {
        if (entity.platform === 'chzzk') {
          return this.chzzkService.getStreamer(entity.channelId);
        }
        // SOOP 미구현 — 오프라인 플레이스홀더 반환
        return {
          id: `soop-${entity.channelId}`,
          platform: 'soop' as const,
          channelId: entity.channelId,
          name: entity.name,
          profileImage: '',
          isLive: false,
        };
      }),
    );

    return results;
  }

  async create(dto: { platform: 'chzzk' | 'soop'; channelId: string; name: string }): Promise<StreamerEntity> {
    const entity = this.streamerRepo.create(dto);
    return this.streamerRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.streamerRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Streamer with id ${id} not found`);
    }
  }
}
