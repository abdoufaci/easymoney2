import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function CancelPage() {
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
      <div className="h-full w-full px-5 flex flex-col items-center justify-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            alt="cancel"
            src={"/cancel.svg"}
            height={50}
            width={50}
            className="w-28 h-28 object-cover"
          />
          <h1 className="text-2xl font-medium text-center">Payment Failed</h1>
          <h3 className="text-[#CECECE] text-center">
            Something went wrong with your payment. <br /> Your transaction was
            not completed.
          </h3>
        </div>
        <Link href={"/dashboard"}>
          <Button variant={"cancelPage"} size={"lg"} className="rounded-full">
            Try Again
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default CancelPage;
