import { sendRabbitMQ } from "../../rabbitmq/rabbitMq"
import { ENTER_LIVE_ROOM, SEND_MESSAGE, RUNNING_LIVE_STREAM, COUNT_STREAMER } from "../../../constant/action"
import { postResponse } from '../../../utils/commonHttpResponse'

interface ISocketControllers {
  enterLiveRoom: (req: any, res: any) => Promise<void>;
  sendMessage: (req: any, res: any) => Promise<void>;
  notifyNewLiveStream: (req: any, res: any) => Promise<void>;
  updateTotalStreamer: (req: any, res: any) => Promise<void>
}

export const socketControllers = (): ISocketControllers => {

  const enterLiveRoom = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => sendRabbitMQ(ENTER_LIVE_ROOM, JSON.stringify(req.body)),
      req.body
    )
  }

  const sendMessage = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => sendRabbitMQ(SEND_MESSAGE, JSON.stringify(req.body)),
      req.body
    )
  }

  const notifyNewLiveStream = async (req: any, res: any): Promise<void> => {
    // console.log(req.body)
    postResponse(res,
      () => sendRabbitMQ(RUNNING_LIVE_STREAM, JSON.stringify(req.body)),
      req.body
    )
  }

  const updateTotalStreamer = async (req: any, res: any): Promise<void> => {
    postResponse(res,
      () => {
        console.log(req.body)
        sendRabbitMQ(COUNT_STREAMER, JSON.stringify(req.body))
      }
    )
  }

  return {
    enterLiveRoom,
    sendMessage,
    notifyNewLiveStream,
    updateTotalStreamer
  }
}
