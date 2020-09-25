import { Server } from "./server";
import { startConsumer } from "./domain/rabbitmq/consumer";


const server = new Server();
startConsumer();
server.listen(port => {
  console.log(`Server is listening on http://localhost:${port}`);
});