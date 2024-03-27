import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function authSession() {
   return await getServerSession(authOptions)
}
