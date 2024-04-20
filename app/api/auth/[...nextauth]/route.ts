// 'use server'
import NextAuth, {NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/prisma/prisma";


const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET
const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET
import CredentialsProvider from "next-auth/providers/credentials";
import {checkCredentials} from "@/utils/auth/auth";
import {getUserByEmail} from "@/utils/data/data";
import bcrypt from "bcrypt";


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
      }),
      CredentialsProvider({
         // The name to display on the sign in form (e.g. "Sign in with...")
         name: "Credentials",
         // `credentials` is used to generate a form on the sign in page.
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         // You can pass any HTML attribute to the <input> tag through the object.
         credentials: {
            email: {label: "email", type: "text", placeholder: "jsmith@mail.com"},
            password: {label: "Password", type: "password"}
         },
         async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            if (!credentials) return null
            const user = await getUserByEmail(credentials.email);
            if (!user?.password) return null;
            if (await bcrypt.compare(credentials.password, user.password)) {
               return {
                  id: user.id,
                  name: user.name,
                  email: user.email
                  // image : user.image,
               }
            }
            return null;
         }
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

export {handler as GET, handler as POST}
