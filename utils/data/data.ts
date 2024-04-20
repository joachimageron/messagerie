'use server'
import {prisma} from "@/prisma/prisma";
import {getAuthSession} from "@/utils/auth/auth";
import bcrypt from 'bcrypt';
const getAllUsers = async () => {
   return prisma.user.findMany();
}

export const getUserByEmail = async (email: string) => {
   return prisma.user.findFirst({
      where: {
         email,
      },
   });
}
export const getUserByCredentials = async (email: string, password: string)=>{
   return prisma.user.findFirst({
      where:{
         email,
         password
      }
   })
}
export const addUser = async (formData: FormData) => {
   const name = formData.get('name') as string;
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;
   const image = formData.get('image') as string;
   
   const hashedPassword = await bcrypt.hash(password, 10);
   
   return prisma.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
         image,
      },
   });

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

export const getMessages = async (senderId: string, receiverId: string) => {
   console.log(senderId, receiverId)
   return prisma.message.findMany({
      where: {
         OR: [
            {
               senderId :{ contains: senderId },
               receiverId :{ contains: receiverId },
            },
            {
               senderId: { contains: receiverId },
               receiverId: {contains: senderId},
            },
         ],
      },
   });
}

export const addMessageForm = async (formData: FormData) => {
   const senderId = formData.get('senderId') as string;
   const receiverId = formData.get('receiverId') as string;
   const text = formData.get('messageText') as string;
   const result = prisma.message.create({
      data: {
         senderId,
         receiverId,
         text,
         date: new Date(),
         seen: false,
      },
   });
   console.log(result)
   return result;
};
export const addMessageParam = async (senderId:string, receiverId: string, text: string) => {
if (!senderId || !receiverId || !text) {
      return false;
   }
   const result = prisma.message.create({
      data: {
         senderId,
         receiverId,
         text,
         date: new Date(),
         seen: false,
      },
   });
   console.log(result)
   return result;
};
