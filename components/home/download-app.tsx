import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  dict: any;
  lang: any;
}

function DownloadApp({ dict, lang }: Props) {
  return (
    <div className="flex flex-col-reverse md:!flex-row items-center justify-center gap-10">
      <Image
        alt="blur"
        src={"/followup-blur-1.png"}
        height={400}
        width={400}
        className="absolute bottom-0 left-0"
      />
      <Image
        alt="blur"
        src={"/followup-blur-2.png"}
        height={400}
        width={400}
        className="absolute bottom-0 right-0"
      />
      <div className="w-full md:!w-[50%]">
        <Image
          alt="phones"
          src={"/phones.svg"}
          height={500}
          width={500}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-5 w-full md:!w-[50%] h-full",
          lang === "ar" && "items-end"
        )}>
        <Image
          alt="warning"
          src={"/warning.png"}
          height={20}
          width={20}
          className="object-cover"
        />
        <h1
          className={cn("text-2xl font-medium", lang === "ar" && "text-right")}>
          {dict.home.download.title}
        </h1>
        <p
          className={cn(
            "text-[#DEDEDE] text-sm",
            lang === "ar" && "text-right"
          )}>
          {dict.home.download.subTitle}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Image
            alt="playStore"
            src={"/qr.svg"}
            height={200}
            width={200}
            layout="intrinsic"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Image
              alt="playStore"
              src={"/google-play.svg"}
              height={150}
              width={150}
              layout="intrinsic"
            />
            <Image
              alt="appleStore"
              src={"/apple-store.svg"}
              height={150}
              width={150}
              layout="intrinsic"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadApp;
