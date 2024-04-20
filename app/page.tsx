import {getAuthSession} from "@/utils/auth/auth";
import {AuthButtons, LogoutButton} from "@/app/authButtons";
import {getAllUsersExceptCurrent} from "@/utils/data/data";
import Link from "next/link";


export default async function Home() {
   const session = await getAuthSession()
   console.log("session" ,session)
   if (!session?.user) return <AuthButtons/>
   
   const users = await getAllUsersExceptCurrent();
   
   return (
      <div>
         <h1>
            {`Hello ${session.user.name}`}
         </h1>
         <div>
            {users.map(user => (
               <Link key={user.id} href={`/conversation/${user.id}`}>
                  <div className={'my-10 flex gap-5 items-center'} key={user.id}>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={user.image ?? ""} alt="user" width={50} height={50}/>
                     <p>
                        {user.name}
                     </p>
                     <p>
                        {user.email}
                     </p>
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
