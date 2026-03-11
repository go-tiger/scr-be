export type Platform = 'chzzk' | 'soop';

export interface Streamer {
  id: string;
  platform: Platform;
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
