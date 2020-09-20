import { Server as HTTPServer } from "http";
import { config } from "dotenv";
import { App } from "./http/app";

export class Server {
  private httpServer!: HTTPServer;
  private app!: App;

  constructor() {
    config();
    this.initialize();
  }

  private initialize(): void {
    this.app = new App();
    this.httpServer = this.app.httpServer;
  }

  public listen(callback: (port: any) => void): void {
    this.httpServer.listen(process.env.PORT, () => {
      callback(process.env.PORT);
    });
  }
}
