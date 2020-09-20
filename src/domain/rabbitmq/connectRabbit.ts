import { connect, Connection } from 'amqplib/callback_api';
export const connectRabbit = (cb: (connection: Connection) => void) => {
  connect(process.env.RABBITMQ_URL, (error0: any, connection: Connection) => {
    if (error0) {
      throw error0;
    }
    cb(connection);
  });
}