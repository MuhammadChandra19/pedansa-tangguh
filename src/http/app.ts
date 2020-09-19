import express, { Application } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';

export class App {
  private app!: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  public getApp(): Application {
    return this.app;
  }

}
