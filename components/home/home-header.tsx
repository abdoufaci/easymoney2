import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  dict: any;
}

function HomeHeader({ dict }: Props) {
  return (
    <header className=" fixed w-full pt-10 pb-5 backdrop-blur-lg z-40">
      <nav className="w-[90%] sm:!w-[80%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <Image
              alt="logo"
              src={"/logo.svg"}
              height={100}
              width={150}
              className="object-cover"
            />
          </Link>
        </div>
        <div className="flex items-center gap-7">
          <Link href={"/auth/login"} className="block">
            <Button
              variant={"addSection"}
              className="rounded-full md:!w-40 bg-opacity-10 bg-[#D9D9D91A]">
              {dict.auth.login}
            </Button>
          </Link>
          <Link href={"/auth/register"}>
            <Button variant={"success"} className="rounded-full md:!w-40">
              {dict.home.signUp}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default HomeHeader;
