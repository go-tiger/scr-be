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
    if (!channel) {
      throw new Error(`존재하지 않는 CHZZK 채널 ID: ${channelId}`);
    }
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

    let thumbnail: string | undefined = live.liveImageUrl?.replace('{type}', '480') ?? undefined;

    if (!thumbnail) {
      try {
        const { data: detailRes } = await firstValueFrom(
          this.httpService.get(
            `${BASE_URL}/service/v2/channels/${channelId}/live-detail`,
            { headers: HEADERS },
          ),
        );
        thumbnail = detailRes.content?.liveImageUrl?.replace('{type}', '480') ?? undefined;
      } catch {
        // 썸네일 없이 진행
      }
    }

    return {
      ...streamer,
      title: live.liveTitle ?? undefined,
      viewerCount: live.concurrentUserCount ?? undefined,
      thumbnail,
      category: live.liveCategoryValue ?? undefined,
      tags: live.tags?.length ? live.tags : undefined,
    };
  }
}
