import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('streamers')
export class StreamerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: 'chzzk' | 'soop';

  @Column()
  channelId: string;

  @Column()
  name: string;
}
