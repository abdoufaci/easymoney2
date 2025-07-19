import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  dict: any;
}

function CtaSection({ dict }: Props) {
  return (
    <div
      style={{
        backgroundImage: "url('/cta-bg.svg')",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-[90%] mx-auto h-[600px] rounded-2xl flex flex-col items-center justify-center gap-7 border-[1px] border-white/20">
      <div className="flex items-center px-5 rounded-full gap-2 joinCard">
        <Image
          alt="logo"
          src={"/logo-alone.svg"}
          height={40}
          width={40}
          className="object-cover"
        />
        <h1
          className="bg-[linear-gradient(133.7deg,_#FFFFFF_19.38%,_rgba(255,_255,_255,_0)_131.08%)] text-transparent 
        bg-clip-text text-sm">
          {dict.home.cta.join}
        </h1>
      </div>
      <h1 className="textGradient dark:!text-white textGradient font-medium text-center text-5xl md:!text-6xl lg:!text-7xl w-full max-w-4xl pb-2.5">
        {dict.home.cta.title}
      </h1>
      <Button
        size={"lg"}
        className="reserveButton hover:bg-[#1FB4AB45] rounded-xl text-white">
        {dict.home.cta.button}
      </Button>
    </div>
  );
}

export default CtaSection;
