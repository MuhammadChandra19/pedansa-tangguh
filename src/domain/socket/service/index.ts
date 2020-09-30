import { IMessageClient, ILiveStream } from "../model";
import { COUNT_STREAMER, INCOMING_MESSAGE, RUNNING_LIVE_STREAM, SERVER_MESSAGE } from "../../../constant/action";
interface ISocketService {
  handleSendMessage: ({ name, room, message, date }: IMessageClient) => void;
  handleNewLiveStream: (liveData: ILiveStream) => void;
  handleJoinLiveRoom: (name: string, room: string) => void;
  handleCountStreamer: (name: string, room: string, count: number, isJoining: boolean) => void;
}

export const socketService = (): ISocketService => {

  const handleSendMessage = ({ name, room, message, date }: IMessageClient): void => {
    globalThis.io
      .to(room)
      .emit(
        INCOMING_MESSAGE,
        { name, message, date }
      );
  }

  const handleJoinLiveRoom = (name: string, room: string): void => {
    const socket = globalThis.socket;

    if (socket) {
      globalThis.socket.broadcast.to(room).emit(SERVER_MESSAGE, name);
      globalThis.socket.join(room, (err: any) => {
        if (err) {
          console.log(err)
          return
        }

      });
    }
  }

  const handleNewLiveStream = (liveData: ILiveStream): void => {
    globalThis.io
      .emit(RUNNING_LIVE_STREAM, {
        ...liveData
      });
  }

  const handleCountStreamer = (name: string, room: string, count: number, isJoining: boolean): void => {
    const socket = globalThis.socket;
    if (socket) {
      if (isJoining) {
        handleJoinLiveRoom(name, room)
      }
      globalThis.socket
        .to(room)
        .emit(
          COUNT_STREAMER,
          count
        );

    }
  }

  return {
    handleSendMessage,
    handleNewLiveStream,
    handleJoinLiveRoom,
    handleCountStreamer
  }

}