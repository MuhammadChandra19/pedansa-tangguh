import { Server as HTTPServer } from "http";
import socketIO, { Namespace, Server } from "socket.io";

class SocketHandler {
  public io!: Server;
  public ioNameSpace: Namespace;

  constructor(httpServer: HTTPServer) {

    this.io = socketIO(httpServer);

    this.ioNameSpace = this.io.on('connection', socket => {
      // global.socket = socket;
      var tempSocket = socket;
      globalThis.io = this.io
      globalThis.socket = tempSocket;
      socket.on("disconnect", () => {
        console.log(`${socket.id} User disconnected.`)
      });
    });

  }

}
export default SocketHandler