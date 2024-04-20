'use client';
import {useState} from "react";
import {addMessageParam, getMessages} from "@/utils/data/data";
export const MessagesContainer = ({
   senderId,
   receiverId,
   initialMessages
}: Readonly<{
   senderId: string,
   receiverId: string,
   initialMessages: ReadonlyArray<{
      id: string,
      text: string,
      senderId: string,
   }>
}>) => {
   const [messages, setMessages] = useState(initialMessages);
   console.log(messages)
   const handleMessages = async () => {
      const inputElement = document.getElementById('messageInput2') as HTMLInputElement;
      const result = await addMessageParam(
         senderId,
         receiverId,
         inputElement.value
      );
      if (result) {
         setMessages(prevState => [...prevState, result])
         inputElement.value = '';
      }
   }
   return (
      <div className={'flex flex-col justify-center'}>
         <div>
            {messages.map(message => (
               <div className={'flex flex-col my-5' + (message.senderId === senderId ? ' justify-end items-end ':' justify-start items-start ') } key={message.id}>
                  <p>{message.text}</p>
               </div>
            ))}
         </div>
         <input className={'text-black'} id={"messageInput2"} type={'text'}/>
         <button onClick={()=>handleMessages()}>Send
         </button>
      </div>
   )
}
