import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SuccessPage() {
  return (
    <main
      style={{
        backgroundImage: "url('/blur-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex flex-col items-center gap-10 p-10 h-screen bg-cover w-full">
      <Link href={"/dashboard"}>
        <Image alt="logo" src={"/logo.svg"} height={120} width={180} />
      </Link>
      <div
        className="h-full w-full px-5 flex flex-col items-center justify-center gap-5 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            alt="success"
            src={"/success.svg"}
            height={50}
            width={50}
            className="w-28 h-28 object-cover"
          />

          <h1 className="text-2xl font-medium text-center">
            Thank you for your purchase!
          </h1>
          <h3 className="text-[#CECECE] text-center">
            Your transaction has been received and you will receive access
          </h3>
        </div>
        <Link href={"/dashboard"}>
          <Button
            variant={"successPage"}
            size={"lg"}
            className="rounded-full w-32">
            Done
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default SuccessPage;
