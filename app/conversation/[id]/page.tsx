
import Link from "next/link";
import {getAuthSession} from "@/src/auth/auth";
import {LoginButton} from "@/app/authButtons";
import {MessageInputs} from "@/app/conversation/[id]/messagesInputs";

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
   const session = await getAuthSession()
   
   if (!session?.user) return <LoginButton/>

   return (
      <div>
         <Link href={`/`}>
            <p>{'<-'}Home</p>
         </Link>
         Conv Id: {params.id}
         <MessageInputs senderId={session.user.id} receiverId={params.id} />
      </div>
   )
}
