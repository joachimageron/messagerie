'use server'
import Link from "next/link";
import {getAuthSession} from "@/utils/auth/auth";
import {AuthButtons} from "@/app/authButtons";
import {MessagesContainer} from "@/app/conversation/[id]/messagesContainer";
import {addMessageForm, getMessages} from "@/utils/data/data";

export default async function Page({params}: Readonly<{ params: { id: string } }>) {
   const session = await getAuthSession()
   
   if (!session?.user) return <AuthButtons/>
   
   const messages = await getMessages(session.user.id, params.id)

   return (
      <div className={'mx-auto max-w-xl'}>
         <Link href={`/`}>
            <p className={'my-10'}>{'<-'}Home</p>
         </Link>
         <div>
            <MessagesContainer initialMessages={messages} senderId={session.user.id} receiverId={params.id}/>
         </div>
      </div>
   )
}
