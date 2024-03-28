'use client'
import {useState} from "react";
import {addMessage} from "@/src/data/data";
export const MessageInputs = ({
   senderId,
   receiverId,
}: Readonly<{
   senderId: string,
   receiverId: string
}>) => {
   
   const [messageText,setMessageText] = useState("")
   
   const send = async () => {
      console.log('send')
      await addMessage(senderId, receiverId, messageText)
   }
   
   return (
      <>
         <input id={"messageInput"} type={'text'} value={messageText} onChange={e => setMessageText(e.target.value)}/>
         <button onClick={() => send()}>Send</button>
      </>
   )
}
