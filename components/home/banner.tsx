import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  dict: any;
}

function Banner({ dict }: Props) {
  return (
    <div
      style={{
        backgroundImage: "url('/banner-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-screen w-full flex flex-col items-center justify-center gap-7">
      <h1 className="bg-[linear-gradient(291.9deg,_#FFFFFF_62.65%,_#000000_108.48%)] dark:!text-white text-transparent bg-clip-text text-5xl md:!text-7xl w-full max-w-6xl text-center">
        {dict.home.bannerTitle}
      </h1>
      <div className="text-center w-[90%] mx-auto">
        <h3 className="text-white/60">{dict.home.bannerSubTitle1}</h3>
        <h3 className="text-white/60">{dict.home.bannerSubTitle2}</h3>
      </div>
      <Link href={"/auth/register"}>
        <Button variant={"success"} className="rounded-full w-40">
          {dict.home.getStarted}
        </Button>
      </Link>
    </div>
  );
}

export default Banner;
