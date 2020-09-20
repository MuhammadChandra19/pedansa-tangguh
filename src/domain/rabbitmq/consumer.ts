
import { Connection } from 'amqplib/callback_api';
import { connectRabbit } from './connectRabbit';
import { INCOMING_MESSAGE, RUNNING_LIVE_STREAM } from '../../constant/action';
import { IMessageClient, ILiveStream } from '../socket/model';
import { createRabbitChannel } from './createRabbitChannel';
import { socketService } from '../socket/service'

const { handleJoinLiveRoom, handleNewLiveStream, handleSendMessage } = socketService();

connectRabbit((connection: Connection) => {
  createRabbitChannel<IMessageClient>(connection, INCOMING_MESSAGE, (message) => {
    handleSendMessage(message);
  });
});

connectRabbit((connection: Connection) => {
  createRabbitChannel<ILiveStream>(connection, RUNNING_LIVE_STREAM, (liveData) => {
    handleNewLiveStream(liveData);
  });
});

connectRabbit((connection: Connection) => {
  createRabbitChannel<{ name: string, room: string }>(connection, RUNNING_LIVE_STREAM, ({ name, room }) => {
    handleJoinLiveRoom(name, room);
  });
});

