import { Streamer } from '../../common/types/streamer.type';

export class StreamerResponseDto implements Streamer {
  dbId: number;
  id: string;
  platform: 'chzzk' | 'soop';
  channelId: string;
  name: string;
  profileImage: string;
  isLive: boolean;
  title?: string;
  thumbnail?: string;
  viewerCount?: number;
  broadNo?: number;
  category?: string;
}
