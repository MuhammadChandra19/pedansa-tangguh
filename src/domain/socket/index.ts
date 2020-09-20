import { Server as HTTPServer } from "http";
import socketIO, { Namespace, Server } from "socket.io";
import { Dict } from "../../utils/types";
import { IMessageClient, ILiveStream } from "./model";
import { INCOMING_MESSAGE, RUNNING_LIVE_STREAM } from "../../constant/action";

class SocketService {
  private io!: Server;


  public ioConnect(): Namespace {
    return this.io.on('connection', socket => {
      socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
    });
  }

  public handleSendMessage({ name, room, message, date }: IMessageClient): void {
    this.io.to(room).emit(
      INCOMING_MESSAGE,
      { name, message, date }
    );
  }

  public handleNewLiveStream(liveData: ILiveStream): void {
    this.io.emit(RUNNING_LIVE_STREAM, {
      ...liveData
    })
  }

}
export default SocketService