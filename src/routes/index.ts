import { Application } from "express";
import { socketControllers } from "../domain/socket/controllers";

export const routes = (app: Application) => {
  const { enterLiveRoom, notifyNewLiveStream, sendMessage } = socketControllers();

  app.route("/")
    .get((req, res) => {
      res.send("helloo")
    });

  app.route("/newLiveStream")
    .post(notifyNewLiveStream);

  app.route("/chat")
    .post(sendMessage);

  app.route("/enterLiveRoom")
    .post(enterLiveRoom);

}