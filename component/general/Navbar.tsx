import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar(){
  const {getUser}= getKindeServerSession() ;
  const user = await getUser();

    return (
        <nav className="py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <h1 className="text-3xl font-extrabold">
                Hash<span className="text-blue-500">Gen</span>
              </h1>
              
            </Link>
            <div className="hidden sm:flex items-center gap-6">
          <Link
            className="flex items-center text-lg font-semibold hover:text-blue-500 mt-2 transition-colors"
            href="/"
          >
            Home
          </Link>
          <Link
            className="flex items-center text-lg font-semibold mt-2 hover:text-blue-500 transition-colors"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>
     {user ? (
      <div className="flex items-center gap-4 font-bold ">
        <p>Hii {user.given_name}</p>
        <LogoutLink className={buttonVariants()}> LogOut</LogoutLink>
      </div>
     ):( <div className="flex item-center gap-4">
      <RegisterLink className={buttonVariants({variant: "secondary"})}>Signup</RegisterLink>
      <LoginLink className={buttonVariants()}>Login</LoginLink>
    </div>)}
     
 </nav>          
            );
}