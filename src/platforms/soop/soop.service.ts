import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Streamer } from '../../common/types/streamer.type';

const BASE_URL = 'https://chapi.sooplive.co.kr';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 Chrome/122',
  Referer: 'https://www.sooplive.co.kr/',
};

@Injectable()
export class SoopService {
  constructor(private readonly httpService: HttpService) {}

  async getStreamer(channelId: string): Promise<Streamer> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${BASE_URL}/api/${channelId}/station`, {
        headers: HEADERS,
      }),
    );

    const station = data.station;
    if (!station) {
      throw new Error(`존재하지 않는 SOOP 채널 ID: ${channelId}`);
    }

    const profileImage = data.profile_image
      ? `https:${data.profile_image}`
      : '';

    const broad = data.broad ?? null;
    const isLive = broad !== null;

    const streamer: Streamer = {
      id: `soop-${channelId}`,
      platform: 'soop',
      channelId,
      name: station.user_nick ?? channelId,
      profileImage,
      isLive,
    };

    if (!isLive) return streamer;

    return {
      ...streamer,
      title: broad.broad_title ?? undefined,
      viewerCount: broad.current_sum_viewer ?? undefined,
      thumbnail: `https://liveimg.sooplive.co.kr/m/${broad.broad_no}`,
      broadNo: broad.broad_no ?? undefined,
    };
  }
}
