import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  dict: any;
  lang: any;
}

function Solutions({ dict, lang }: Props) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-20 pb-40">
      <div className="flex flex-col items-center gap-2">
        <Image
          alt="logo"
          src={"/logo-alone.svg"}
          height={80}
          width={80}
          className="object-cover"
        />
        <div className="flex flex-col items-center gap-8">
          <h1
            className="bg-[linear-gradient(133.7deg,_#FFFFFF_19.38%,_rgba(255,_255,_255,_0)_131.08%)] dark:!text-white text-transparent 
        bg-clip-text text-5xl min-h-28 md:!min-h-14 font-medium text-center">
            {dict.home.solutions.title}
          </h1>
          <h3 className="text-[#BAB9B9] text-center">
            {dict.home.solutions.subTitle1} <br />{" "}
            {dict.home.solutions.subTitle2}
          </h3>
        </div>
      </div>
      <div className="space-y-5 w-[90%] md:!w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:!grid-cols-[48%_52%] gap-5 w-full">
          <div
            style={{
              backgroundImage: "url('/blur-box-1.svg')",
              backgroundPosition: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className={cn(
              "w-full h-96 rounded-md relative px-7 pb-16 flex flex-col items-start justify-end",
              lang === "en" ? "items-start" : "items-end"
            )}>
            <div
              style={{
                backgroundImage: "url('/icon-blur-box.svg')",
                backgroundPosition: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-12 w-12 rounded-md iconBox absolute top-7 left-7 flex items-center justify-center">
              <Image
                alt="icon"
                src={"/lock-icon.svg"}
                height={10}
                width={10}
                className="object-cover h-12 w-12"
              />
            </div>
            <div className="space-y-4">
              <h1
                className={cn(
                  "text-xl font-medium",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.solutions.titleBox1}
              </h1>
              <h3
                className={cn("text-[#CACACA]", lang === "ar" && "text-right")}>
                {dict.home.solutions.subTitle1Box1} <br />{" "}
                {dict.home.solutions.subTitle2Box1}
              </h3>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/blur-box-2.svg')",
              backgroundPosition: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className={cn(
              "w-full h-96 rounded-md relative px-7 pb-16 flex flex-col items-start justify-end",
              lang === "en" ? "items-start" : "items-end"
            )}>
            <div
              style={{
                backgroundImage: "url('/icon-blur-box.svg')",
                backgroundPosition: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-12 w-12 rounded-md iconBox absolute top-7 left-7 flex items-center justify-center">
              <Image
                alt="icon"
                src={"/rocket-icon.svg"}
                height={10}
                width={10}
                className="object-cover h-12 w-12"
              />
            </div>
            <div className="space-y-4">
              <h1
                className={cn(
                  "text-xl font-medium",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.solutions.titleBox2}
              </h1>
              <h3
                className={cn("text-[#CACACA]", lang === "ar" && "text-right")}>
                {dict.home.solutions.subTitle1Box2} <br />{" "}
                {dict.home.solutions.subTitle2Box2}
              </h3>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:!grid-cols-[52%_48%] gap-5">
          <div
            style={{
              backgroundImage: "url('/blur-box-3.svg')",
              backgroundPosition: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className={cn(
              "w-full h-96 rounded-md relative px-7 pb-16 flex flex-col items-start justify-end",
              lang === "en" ? "items-start" : "items-end"
            )}>
            <div
              style={{
                backgroundImage: "url('/icon-blur-box.svg')",
                backgroundPosition: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-12 w-12 rounded-md iconBox absolute top-7 left-7 flex items-center justify-center">
              <Image
                alt="icon"
                src={"/lamp-icon.svg"}
                height={10}
                width={10}
                className="object-cover h-12 w-12"
              />
            </div>
            <div className="space-y-4">
              <h1
                className={cn(
                  "text-xl font-medium",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.solutions.titleBox3}
              </h1>
              <h3
                className={cn("text-[#CACACA]", lang === "ar" && "text-right")}>
                {dict.home.solutions.subTitle1Box3} <br />{" "}
                {dict.home.solutions.subTitle2Box3}
              </h3>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/blur-box-4.svg')",
              backgroundPosition: "cover",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className={cn(
              "w-full h-96 rounded-md relative px-7 pb-16 flex flex-col items-start justify-end",
              lang === "en" ? "items-start" : "items-end"
            )}>
            <div
              style={{
                backgroundImage: "url('/icon-blur-box.svg')",
                backgroundPosition: "cover",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="h-12 w-12 rounded-md iconBox absolute top-7 left-7 flex items-center justify-center">
              <Image
                alt="icon"
                src={"/light-icon.svg"}
                height={10}
                width={10}
                className="object-cover h-12 w-12"
              />
            </div>
            <div className="space-y-4">
              <h1
                className={cn(
                  "text-xl font-medium",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.solutions.titleBox4}
              </h1>
              <h3
                className={cn("text-[#CACACA]", lang === "ar" && "text-right")}>
                {dict.home.solutions.subTitle1Box4} <br />{" "}
                {dict.home.solutions.subTitle2Box4}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solutions;
