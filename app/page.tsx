import Image from "next/image";
import {LoginButton, LogoutButton} from "@/app/authButtons";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {authSession} from "@/src/lib/auth";


export default async function Home() {
   const session = await authSession()
   return (
      <div>
         <h1>
            {session?.user ? `Hello ${session.user.name}` : "Hello World"}
         </h1>
         {
            session?.user &&
            <div>

               <p>
                  {session.user.email}
               </p>
               <img src={session.user.image ?? ""} alt="user image" width={200} height={200}/>
            </div>
         }
         <div>
            {
               !session?.user ?
                  <LoginButton/> :
                  <LogoutButton/>
            }
         </div>
      </div>
   );
}
