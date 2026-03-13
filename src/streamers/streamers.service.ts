import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Client } from '@libsql/client';
import { LIBSQL_CLIENT } from '../database/database.module';
import { StreamerResponseDto } from './dto/streamer.dto';
import { Streamer } from '../common/types/streamer.type';
import { ChzzkService } from '../platforms/chzzk/chzzk.service';

@Injectable()
export class StreamersService {
  constructor(
    @Inject(LIBSQL_CLIENT) private readonly db: Client,
    private readonly chzzkService: ChzzkService,
  ) {}

  async findAll(): Promise<StreamerResponseDto[]> {
    const result = await this.db.execute('SELECT * FROM streamers');
    const rows = result.rows as unknown as { id: number; platform: 'chzzk' | 'soop'; channelId: string; name: string }[];

    const results = await Promise.all(
      rows.map(async (row) => {
        let streamer: Streamer;
        if (row.platform === 'chzzk') {
          streamer = await this.chzzkService.getStreamer(row.channelId);
        } else {
          streamer = {
            id: `soop-${row.channelId}`,
            platform: 'soop' as const,
            channelId: row.channelId,
            name: row.name,
            profileImage: '',
            isLive: false,
          };
        }
        return { ...streamer, dbId: row.id };
      }),
    );

    return results;
  }

  async create(dto: { platform: 'chzzk' | 'soop'; channelId: string }): Promise<{ id: number }> {
    let name: string;
    if (dto.platform === 'chzzk') {
      const streamer = await this.chzzkService.getStreamer(dto.channelId);
      name = streamer.name ?? dto.channelId;
    } else {
      name = dto.channelId;
    }
    const result = await this.db.execute({
      sql: 'INSERT INTO streamers (platform, channelId, name) VALUES (?, ?, ?)',
      args: [dto.platform, dto.channelId, name],
    });
    return { id: Number(result.lastInsertRowid) };
  }

  async remove(id: number): Promise<void> {
    const result = await this.db.execute({
      sql: 'DELETE FROM streamers WHERE id = ?',
      args: [id],
    });
    if (result.rowsAffected === 0) {
      throw new NotFoundException(`Streamer with id ${id} not found`);
    }
  }
}
