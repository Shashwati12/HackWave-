import { prisma } from "../config/prisma.config"


export const getChatRoom= async(userId:string) => {
    return await prisma.chatRoom.findMany({
        where: {
            participants: {
            some: {
                participant_id: Number(userId),      
            },
        },
    },
});
}

export const getChatByRoomId = async (userId: string, roomId: string) => {
  return await prisma.chatMessage.findMany({
    where: {
      room_id: Number(roomId),
      sender_id: Number(userId),
    },
    orderBy: { created_at: 'asc' },
  });
};