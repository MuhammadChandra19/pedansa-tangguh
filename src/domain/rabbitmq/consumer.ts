import SocketService from '../socket';
import { Connection } from 'amqplib/callback_api';
import { connectRabbit } from './connectRabbit';
import { INCOMING_MESSAGE, RUNNING_LIVE_STREAM } from '../../constant/action';
import { IMessageClient, ILiveStream } from '../socket/model';
import { createRabbitChannel } from './createRabbitChannel';

const socketService = new SocketService();

connectRabbit((connection: Connection) => {
  createRabbitChannel<IMessageClient>(connection, INCOMING_MESSAGE, (message) => {
    socketService.handleSendMessage(message);
  })
});

connectRabbit((connection: Connection) => {
  createRabbitChannel<ILiveStream>(connection, RUNNING_LIVE_STREAM, (liveData) => {
    socketService.handleNewLiveStream(liveData);
  })
})

