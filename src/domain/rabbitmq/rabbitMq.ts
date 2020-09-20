import { Connection, Channel } from 'amqplib/callback_api';
import { connectRabbit } from './connectRabbit';

export const sendRabbitMQ = (queueName: string, data: string) => {
  connectRabbit((connection: Connection) => {
    connection.createChannel((err: any, channel: Channel) => {
      if (err) {
        throw err;
      }

      var queue: string = queueName;

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(data));

    });
    setTimeout(function () {
      connection.close();
      //process.exit(0);
    }, 500);
  });
}
