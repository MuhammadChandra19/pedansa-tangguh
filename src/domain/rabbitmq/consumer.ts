
import { Connection } from 'amqplib/callback_api';
import { connectRabbit } from './connectRabbit';
import { INCOMING_MESSAGE, RUNNING_LIVE_STREAM, SERVER_MESSAGE, ENTER_LIVE_ROOM, SEND_MESSAGE, PAYMENT_PUSH } from '../../constant/action';
import { IMessageClient, ILiveStream } from '../socket/model';
import { createRabbitChannel } from './createRabbitChannel';
import { socketService } from '../socket/service'


export const startConsumer = () => {
  const { handleJoinLiveRoom, handleNewLiveStream, handleSendMessage, handlePushPayment } = socketService();
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
    createRabbitChannel<{ name: string, room: string }>(connection, ENTER_LIVE_ROOM, ({ name, room }) => {
      handleJoinLiveRoom(name, room);
    });
  });

  connectRabbit((connection: Connection) => {
    createRabbitChannel<{ id: string }>(connection, PAYMENT_PUSH, ({ id }) => {
      handlePushPayment(id)
    });
  });
}


