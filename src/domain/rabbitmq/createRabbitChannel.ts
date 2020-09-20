import { Connection, Channel, Message } from 'amqplib/callback_api';

export function createRabbitChannel<T>(connection: Connection, queueName: string, cb: (arg0: T) => void) {
  connection.createChannel((err: any, channel: Channel) => {
    if (err) {
      throw err;
    }
    channel.assertQueue(queueName, {
      durable: false
    });
    channel.consume(queueName, (data: Message) => {
      const message = JSON.parse(data.content.toString()) as T;
      cb(message);
    }, {
      noAck: true
    });
  });
}