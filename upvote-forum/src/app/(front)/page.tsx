import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <div className="flex justify-center items-center invert dark:invert-0 pt-4">
        <Image
          src="/images/logo.svg"
          width={40}
          height={40}
          alt="Logo"
          className="hidden md:block"
        />
      </div>
   
    </div>
  );
}
