import NextAuth, {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github";
   import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/src/lib/prisma";


const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

if (!githubId || !githubSecret) {
   throw new Error("GITHUB_ID and GITHUB_SECRET must be set")
}



export const authOptions: NextAuthOptions = {
   providers: [
      GithubProvider({
         clientId: githubId,
         clientSecret: githubSecret,
      }),
      // ...add more providers here
   ],
   adapter: PrismaAdapter(prisma),
   callbacks: {
      async session({session, user}) {
         if (session?.user) session.user.id = user.id
         return session
      }
   
   }
}

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
