import {getAuthSession} from "@/src/auth/auth";
import {LoginButton, LogoutButton} from "@/app/authButtons";
import {getAllUsersExceptCurrent} from "@/src/data/data";
import Link from "next/link";


export default async function Home() {
   const session = await getAuthSession()
   if (!session?.user) return <LoginButton/>
   
   const users = await getAllUsersExceptCurrent();
   
   return (
      <div>
         <h1>
            {`Hello ${session.user.name}`}
         </h1>
         <div>
            <p>
               {session.user.email}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={session.user.image ?? ""} alt="user" width={200} height={200}/>
         </div>
         <div>
            {users.map(user => (
               <Link key={user.id} href={`/conversation/${session.user.id}`}>
                  <div key={user.id}>
                     <p>
                        {user.name}
                     </p>
                     <p>
                        {user.email}
                     </p>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={user.image ?? ""} alt="user" width={200} height={200}/>
                  </div>
               </Link>
            ))}
         </div>
         
         <div>
            <LogoutButton/>
         </div>
      </div>
   );
}
