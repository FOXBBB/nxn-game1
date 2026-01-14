/*import {
  WebSocketGateway,
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TapService } from './tap.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class TapGateway {

  @WebSocketServer()
  server;

  constructor(
    private tapService: TapService,
  ) {}

  async getCurrentLeaderboard() {
    return this.tapService.getLeaderboard();
  }

  broadcastLeaderboard(top) {
    this.server.emit('leaderboard', top);
  }
}
*/