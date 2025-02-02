import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DirectChatService } from './direct-chat.service';
import { Types } from 'mongoose';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow any origin (adjust for production)
  },
})
export class DirectChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server; // Socket.IO server instance

  private activeUsers = new Map<string, string>(); // userID -> socketID map

  constructor(private readonly chatService: DirectChatService) {}

  // Handle new connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    const userID = [...this.activeUsers.entries()].find(
      ([, socketID]) => socketID === client.id,
    )?.[0];

    if (userID) {
      this.activeUsers.delete(userID);
      console.log(`User disconnected: ${userID}`);
    }
  }

  // Handle user registration (when a user connects and sends their userID)
  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userID: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.activeUsers.set(userID, client.id);
    console.log(`User registered: ${JSON.stringify(userID)}, ${client.id}`);

    console.debug('\n\nactive users: ', this.activeUsers);
  }

  // Handle sending a message
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    messageData: {
      sendID: string;
      receiverID: string;
      message: string;
      messageType: string;
      attachmentUrl?: string;
    },
  ) {
    const { sendID, receiverID, message, messageType, attachmentUrl } =
      messageData;

    // Store message in the database
    const savedMessage = await this.chatService.createChat(
      new Types.ObjectId(sendID),
      new Types.ObjectId(receiverID),
      message,
      messageType,
      attachmentUrl,
    );

    // Emit message to the sender
    const senderSocketID = this.activeUsers.get(sendID);
    if (senderSocketID) {
      this.server.to(senderSocketID).emit('message_sent', savedMessage);
    }

    // Emit message to the receiver if online
    const receiverSocketID = this.activeUsers.get(receiverID);
    if (receiverSocketID) {
      this.server.to(receiverSocketID).emit('new_message', savedMessage);
    }
  }
}
