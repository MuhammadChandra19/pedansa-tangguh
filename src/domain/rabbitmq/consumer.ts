
import { Connection } from 'amqplib/callback_api';
import { connectRabbit } from './connectRabbit';
import { RUNNING_LIVE_STREAM, SEND_MESSAGE, COUNT_STREAMER } from '../../constant/action';
import { IMessageClient, ILiveStream } from '../socket/model';
import { createRabbitChannel } from './createRabbitChannel';
import { socketService } from '../socket/service'


export const startConsumer = () => {
  const { handleNewLiveStream, handleSendMessage, handleCountStreamer } = socketService();
  connectRabbit((connection: Connection) => {
    createRabbitChannel<IMessageClient>(connection, SEND_MESSAGE, (message) => {
      handleSendMessage(message);
    });
  });

  connectRabbit((connection: Connection) => {
    createRabbitChannel<ILiveStream>(connection, RUNNING_LIVE_STREAM, (liveData) => {
      handleNewLiveStream(liveData);
    });
  });

  connectRabbit((connection: Connection) => {
    createRabbitChannel<{ name: string, room: string, count: number, isJoining: boolean }>(connection, COUNT_STREAMER, ({ name, room, count, isJoining }) => {
      console.log({ name, room, count, isJoining })
      handleCountStreamer(name, room, count, isJoining);
    });
  });
}


