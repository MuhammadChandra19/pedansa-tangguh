import { connect, Connection, Channel } from 'amqplib/callback_api';

export const sendRabbitMQ = (queueName: string, data: string) => {
  connect(process.env.RABBITMQ_URL, (error0: any, connection: Connection) => {
    if (error0) {
      throw error0;
    }
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
