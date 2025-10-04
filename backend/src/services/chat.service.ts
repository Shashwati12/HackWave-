import { prisma } from "../config/prisma.config"


export const getChatRoom= async(userId:number) => {
    return await prisma.chatRoom.findMany({
        where: {
            participants: {
            some: {
                participant_id: userId,      
            },
        },
    },
});
}

export const getChatByRoomId = async (userId: number, roomId: string) => {
  return await prisma.chatMessage.findMany({
    where: {
      room_id: Number(roomId),
      sender_id: userId,
    },
    orderBy: { created_at: 'asc' },
  });
};