
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbar bg-white shadow-md fixed top-0 z-50 px-6">
      
      <div className="flex-1">
        <Link href="/dashboard" className="btn btn-ghost text-xl text-black hover:bg-white hover:border-blue-500 ">Manager Panel</Link>
        <p className="text-blue-700 text-sm font-bold ml-2">Online Learing Platform</p>
        
      </div>

      
      <div className="hidden lg:flex gap-2 text-black">
        <h2 className="text-blue-700 text-3xl font-bold mr-100 ">C o u r s e r a</h2>
        <br></br>
        

        <Link
          href="/dashboard"
          
        >
          Dashboard
        </Link>
        <Link href="/aboutus">

          AboutUs
        </Link>
        <Link href="/profile">Profile</Link>
        
      </div>

    </div>
  );
}
