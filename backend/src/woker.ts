import {prisma} from "./config/prisma.config";
import redisclient from "./config/redis.config";

console.log("⚙️ Worker started. Listening for tasks in the message queue...");

async function processMessageQueue() {
  while (true) {
    try {
      const result = await redisclient.blPop('message_queue', 0);
      if (!result) continue;

      const task = JSON.parse(result.element);

      switch (task.type) {
        case "MESSAGE": {

          const senderId = parseInt(task.user.id, 10);
          const senderRole = (task.user.role || 'User') 
          console.log(task);
          
          const messageCreateData: any = {
            content: task.message,
            room_id: parseInt(task.room, 10),
            sender_id: senderId,
            sender_type: senderRole,
          };

          
          await prisma.chatMessage.create({ data: messageCreateData });

          console.log(`[Worker] Saved message to room ${task.room} from ${senderRole} ${senderId}`);
        
          break;
        }

        case "RESET_UNREAD_COUNT": {
          
          await prisma.chatParticipant.update({
            where: {
              userId_chatRoomId: {
                userId: task.payload.userId,
                chatRoomId: parseInt(task.payload.roomId, 10),
              },
            },
            data: { unreadCount: 0 },
          });
          console.log(`[Worker] Reset unread count for user ${task.payload.userId} in room ${task.payload.roomId}`);
          break;
        }
      }
    } catch (error) {
      console.error("[Worker] Error processing task:", error);
    }
  }
}


processMessageQueue();
