import NextAuth, {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/prisma/prisma";


const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET
const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET

if (!githubId || !githubSecret || !googleId || !googleSecret) {
   console.log(githubId, githubSecret, googleId, googleSecret)
   throw new Error("Missing environment variables for authentication providers.")
}



export const authOptions: NextAuthOptions = {
   providers: [
      // ...add more providers here
      GithubProvider({
         clientId: githubId,
         clientSecret: githubSecret,
      }),
      GoogleProvider({
         clientId: googleId,
         clientSecret: googleSecret,
      })
   ],
   adapter: PrismaAdapter(prisma),
   callbacks: {
      async session({session, user}) {
         if (session?.user) session.user.id = user.id
         return session
      }
   
   }
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
