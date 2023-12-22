"use client";
import React from "react";
import Image from "next/image";
import SideBarLinks from "../common/SideBarLinks";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-5  hidden md:block">
      <Link href='/' className="flex justify-start items-center">
        <Image src="/images/logo.svg" width={40} height={40} alt="logo" className="invert dark:invert-0" />
        <h1 className="font-bold text-xl ml-2">UpVote</h1>
      </Link>
      {/* @ts-ignore */}
      <SideBarLinks />
    </div>
  );
}
