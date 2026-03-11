import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Streamer } from '../../common/types/streamer.type';

const BASE_URL = 'https://api.chzzk.naver.com';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 Chrome/122',
  Referer: 'https://chzzk.naver.com/',
};

@Injectable()
export class ChzzkService {
  constructor(private readonly httpService: HttpService) {}

  async getStreamer(channelId: string): Promise<Streamer> {
    const { data: channelRes } = await firstValueFrom(
      this.httpService.get(`${BASE_URL}/service/v1/channels/${channelId}`, {
        headers: HEADERS,
      }),
    );

    const channel = channelRes.content;
    const isLive: boolean = channel.openLive ?? false;

    const streamer: Streamer = {
      id: `chzzk-${channelId}`,
      platform: 'chzzk',
      channelId,
      name: channel.channelName,
      profileImage: channel.channelImageUrl ?? '',
      isLive,
    };

    if (!isLive) return streamer;

    const { data: liveRes } = await firstValueFrom(
      this.httpService.get(
        `${BASE_URL}/polling/v2/channels/${channelId}/live-status`,
        { headers: HEADERS },
      ),
    );

    const live = liveRes.content;

    return {
      ...streamer,
      title: live.liveTitle ?? undefined,
      viewerCount: live.concurrentUserCount ?? undefined,
      thumbnail: live.liveImageUrl?.replace('{type}', '480') ?? undefined,
      category: live.liveCategoryValue ?? undefined,
    };
  }
}
