import {prisma} from "@/prisma/prisma";
import {getAuthSession} from "@/src/auth/auth";

const getAllUsers = async () => {
   return prisma.user.findMany();
}

export const getAllUsersExceptCurrent = async () => {
   const session = await getAuthSession();
   if (!session?.user) {
      return [];
   }
   return prisma.user.findMany({
      where: {
         id: {
            not: session?.user?.id,
         },
      },
   });
}
export const addMessage = async (senderId: string, receiverId: string, text: string) => {
   return prisma.message.create({
     data: {
        senderId,
        receiverId,
        text,
        date: new Date(),
        seen: false,
     },
  });
};
