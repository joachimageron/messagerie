'use server';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {addUser, getUserByEmail} from "@/utils/data/data";
import bcrypt from "bcrypt";

// server side function
export const getAuthSession = async () => {
   return await getServerSession(authOptions)
}

export const addUserCredentials = async (formData: FormData) => {
   if (!formData.get('name') || !formData.get('email') || !formData.get('password')) return 0;
   if (await getUserByEmail(formData.get('email') as string)) return 1;
   console.log('addUserCredentials', formData.get('name'), formData.get('email'), formData.get('password'));
   return addUser(formData);
}

export const checkCredentials = async (email: string, password: string) => {

}



