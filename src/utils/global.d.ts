import { Socket, Server } from 'socket.io'

declare global {
  var socket: Socket;
  var io: Server;
}