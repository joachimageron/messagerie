'use client'
import React, {useState} from 'react';
import {addUserCredentials} from "@/utils/auth/auth";
import {useRouter} from "next/navigation";

export default function SignupPage() {
   const router = useRouter()
   const handleSubmit = async (e: FormData) => {
      const usedMailAllert = document.getElementById('usedMailAllert') as HTMLParagraphElement;
      const errorAllert = document.getElementById('errorAllert') as HTMLParagraphElement;
      const userAddedAllert = document.getElementById('userAddedAllert') as HTMLParagraphElement
      usedMailAllert.classList.add('hidden');
      errorAllert.classList.add('hidden');
      
      const user = await addUserCredentials(e)
      console.log(user)
      if (user === 0) errorAllert.classList.remove('hidden');
      if (user === 1) usedMailAllert.classList.remove('hidden');
      
      if (user !== 0 && user !== 1) {
         userAddedAllert.classList.add('block');
         setTimeout(()=>{
            router.push('/')
         }, 1000)
      }
      
   };
   
   return (
  <div>
    <h1>Signup Page</h1>
    <form action={handleSubmit} className={'flex flex-col gap-5'}>
      <div>
        <label htmlFor={'name'}>Name:</label>
        <input id={'name'} type="text" name={'name'} className={'text-black'} required/>
      </div>
      <div>
        <label htmlFor={'email'}>Email:</label>
        <input id={'email'} type="email" name={'email'} className={'text-black'} required/>
      </div>
      <div>
        <label htmlFor={'password'}>Password:</label>
        <input id={'password'} type="password" name={'password'} className={'text-black'} required/>
      </div>
       <div>
          <p id={'usedMailAllert'} className={'hidden text-red-600'}>cet adresse mail existe déjà</p>
          <p id={'errorAllert'} className={'hidden text-red-600'}>une erreur est survenue</p>
          <p id={'userAddedAllert'} className={'hidden text-green-500'}>Utilisateur ajouté avec success</p>
       </div>
      <input type="submit" value="Submit"/>
    </form>
  </div>
);
}
