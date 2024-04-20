'use client';
import {signIn, signOut} from "next-auth/react";
import Link from "next/link";

export const AuthButtons = () => {
   return (
      <>
         <button
            className={'inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'}
            onClick={() => signIn()}>
            Login
         </button>
         <Link
            href={'/signup'}
            className={'inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'}
         >
            Sign up
         </Link>
      
      </>
   )
      ;
}
export const LogoutButton = () => {
   return (
      <button
         className={'inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'}
         onClick={() => signOut()}>
         Logout
      </button>
   );
}
