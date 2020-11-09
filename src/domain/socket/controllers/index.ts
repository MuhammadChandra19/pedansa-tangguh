import { postResponse } from '../../../utils/commonHttpResponse'
import { socketService } from '../service'

interface ISocketControllers {
  enterLiveRoom: (req: any, res: any) => Promise<void>;
  sendMessage: (req: any, res: any) => Promise<void>;
  notifyNewLiveStream: (req: any, res: any) => Promise<void>;
  pushPayment: (req: any, res: any) => Promise<void>;
}

export const socketControllers = (): ISocketControllers => {
  const { handleJoinLiveRoom, handleNewLiveStream, handleSendMessage, handlePushPayment } = socketService();
  const enterLiveRoom = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => handleJoinLiveRoom(req.body.name, req.body.room),
      req.body
    )
  }

  const sendMessage = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => handleSendMessage({
        name: req.body.name,
        room: req.body.room,
        message: req.body.message,
        date: req.body.date
      }),
      req.body
    )
  }

  const notifyNewLiveStream = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => handleNewLiveStream(req.body),
      req.body
    )
  }

  const pushPayment = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => handlePushPayment(req.body.id, req.body.orderId, req.body.message),
      req.body
    )
  }

  return {
    enterLiveRoom,
    sendMessage,
    notifyNewLiveStream,
    pushPayment
  }
}
