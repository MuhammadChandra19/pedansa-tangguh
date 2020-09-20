import { Server as HTTPServer } from "http";
import socketIO, { Namespace, Server } from "socket.io";

class SocketHandler {
  private io!: Server;
  public ioNameSpace: Namespace;

  constructor(httpServer: HTTPServer) {

    this.io = socketIO(httpServer);

    this.ioNameSpace = this.io.on('connection', socket => {
      global.socket = socket;
      socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
    });

  }

}
export default SocketHandler