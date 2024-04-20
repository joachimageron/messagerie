
import {getAuthSession} from "@/utils/auth/auth";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

export const metadata: Metadata = {
   title: "Sign up to spik",
   description: "signu to spik"
};

export default async function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await getAuthSession()
   if (session?.user) redirect(`/`)
   
   return (
      <main>{children}</main>
   );
}
