import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


// server side function
export  const getAuthSession = async () =>{
   return await getServerSession(authOptions)
}



