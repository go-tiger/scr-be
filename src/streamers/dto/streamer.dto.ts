export class StreamerDto {
  id: string;
  name: string;
  platform: 'chzzk' | 'soop';
  isLive: boolean;
  viewerCount?: number;
  streamTitle?: string;
  thumbnailUrl?: string;
}
