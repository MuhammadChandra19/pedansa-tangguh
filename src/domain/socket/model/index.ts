import { LiveType } from '../../../utils/types'
export interface IMessageClient {
  name: string;
  room: string;
  message: string;
  date: string;
}


export interface ILiveStream {
  userId: string;
  liveId: string;
  title: string;
  type: LiveType;
  startAt: string;
  description: string;
  finishedAt: string;
  isPlaying: boolean;
  thumbnails?: string;
}