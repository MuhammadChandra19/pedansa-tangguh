import express, { Application } from "express";
import { createServer, Server as HTTPServer } from "http";
import SocketHandler from '../domain/socket'
import bodyParser from 'body-parser';
import cors from 'cors';

import { routes } from "../routes";

export class App {
  private app!: Application;
  public httpServer!: HTTPServer;
  public socketHandler!: SocketHandler;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.httpServer = createServer(this.app);
    this.socketHandler = new SocketHandler(this.httpServer);
    routes(this.app);
  }

  public getApp(): Application {
    return this.app;
  }

}
