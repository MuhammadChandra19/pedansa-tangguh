import { App } from "../../../http/app"
import { IMessageClient, ILiveStream } from "../model";
import { INCOMING_MESSAGE, RUNNING_LIVE_STREAM, SERVER_MESSAGE } from "../../../constant/action";
interface ISocketService {
  handleSendMessage: ({ name, room, message, date }: IMessageClient) => void;
  handleNewLiveStream: (liveData: ILiveStream) => void;
  handleJoinLiveRoom: (name: string, room: string) => void;
}

export const socketService = (): ISocketService => {
  const { socketHandler } = new App();

  const handleSendMessage = ({ name, room, message, date }: IMessageClient): void => {
    socketHandler
      .ioNameSpace
      .to(room)
      .emit(
        INCOMING_MESSAGE,
        { name, message, date }
      );
  }

  const handleJoinLiveRoom = (name: string, room: string): void => {
    const socket = globalThis.socket as SocketIO.Socket;
    if (socket) {
      socket.broadcast.to(room).emit(SERVER_MESSAGE, `${name} has joined the room!`);
      socket.join(room);
    }
  }

  const handleNewLiveStream = (liveData: ILiveStream): void => {
    socketHandler
      .ioNameSpace
      .emit(RUNNING_LIVE_STREAM, {
        ...liveData
      });
  }

  return {
    handleSendMessage,
    handleNewLiveStream,
    handleJoinLiveRoom
  }

}