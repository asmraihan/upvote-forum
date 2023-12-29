import React, { ReactElement } from "react";

import Link from "next/link";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Bell, Home, Search, User2 } from "lucide-react";
import SignOutBtn from "./SignOutBtn";

interface SideBarLinksProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SideBarLinks({ isOpen, setIsOpen }: SideBarLinksProps): ReactElement | null {
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <ul onClick={
      () => {
        isOpen && setIsOpen(false)
      }
    } className="mt-10">
      <li>
        <Link

          href="/"
          className={`flex justify-start items-center hover:font-bold transition-all duration-300 ${pathname == "/" ? "font-bold" : ""
            }`}
        >
          <Home className="text-xl " height={20} width={20} />
          <h3 className="text-lg lg:text-xl ml-2">Home</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/explore"
          className={`flex justify-start items-center hover:font-bold transition-all duration-300 mt-6 ${pathname == "/explore" ? "font-bold" : ""
            }`}
        >
          <Search className="text-xl " height={20} width={20} />
          <h3 className="text-lg lg:text-xl ml-2">Explore</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/notifications"
          className={`flex justify-start items-center hover:font-bold transition-all duration-300 mt-6 ${pathname == "/notifications" ? "font-bold" : ""
            }`}
        >
          <Bell className="text-xl " height={20} width={20} />
          <h3 className=" text-lg lg:text-xl  ml-2">Notifications</h3>
        </Link>
      </li>
      <li>
        <Link
          href="/profile"
          className={`flex justify-start items-center hover:font-bold transition-all duration-300 mt-6 ${pathname == "/profile" ? "font-bold" : ""
            }`}
        >
          <User2 className="text-xl " height={20} width={20} />
          <h3 className="text-lg lg:text-xl  ml-2">Profile</h3> <span className="ms-2">({data?.user?.email})</span>
        </Link>
      </li>

      <li className="flex items-center justify-between absolute bottom-10">
        <SignOutBtn />
        <ThemeToggleBtn />
      </li>
    </ul>
  );
}
