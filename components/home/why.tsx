import { cn } from "@/lib/utils";
import WhySeperator from "./why-seperator";
import { GilroyMedium } from "@/app/fonts";
import { Separator } from "../ui/separator";

interface Props {
  dict: any;
  lang: any;
}

function Why({ dict, lang }: Props) {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col  items-center justify-center gap-14 max-md:!pt-20",
        lang === "en" ? "md:!flex-row" : "md:!flex-row-reverse"
      )}>
      <div className="max-md:!w-[90%] md:!w-[50%] mx-auto flex flex-col items-center space-y-8">
        <div className="space-y-8">
          <div
            className={cn(
              "space-y-2",
              lang === "ar" && "flex flex-col items-end"
            )}>
            <WhySeperator />
            <h1
              className={cn(
                "bg-[linear-gradient(180deg,_#FFFFFF_0%,_#B4B4B4_100%)] dark:!text-white text-transparent bg-clip-text text-4xl",
                lang === "ar" && "text-right"
              )}>
              {dict.home.why.title}
            </h1>
          </div>
          <div
            className={cn(
              "text-sm text-[#CACACA]",
              lang === "ar" && "text-right"
            )}>
            {dict.home.why.subTitle1} <br />
            {dict.home.why.subTitle2} <br />
            {dict.home.why.subTitle3}
          </div>
        </div>
      </div>
      <div className="space-y-20 w-[90%] md:!w-[50%] flex flex-col items-center justify-center max-md:!mx-auto">
        <div className="space-y-20">
          <div
            className={cn(
              "flex items-center gap-5",
              lang === "en" ? "flex-row" : "flex-row-reverse"
            )}>
            <Separator
              orientation="vertical"
              className="bg-brand w-0.5 h-28 rounded-full"
            />
            <div
              className={cn(
                "space-y-5",
                lang === "ar" && "flex flex-col items-end"
              )}>
              <h1 className="text-xl font-medium">{dict.home.why.why1Title}</h1>
              <h3
                className={cn(
                  "text-sm text-[#CACACA]",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.why.why1SubTitle} <br />{" "}
                {dict.home.why.why1SubTitle2} <br />{" "}
                {dict.home.why.why1SubTitle3}
              </h3>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center gap-5",
              lang === "en" ? "flex-row" : "flex-row-reverse"
            )}>
            <Separator
              orientation="vertical"
              className="bg-brand w-0.5 h-28 rounded-full"
            />
            <div
              className={cn(
                "space-y-5",
                lang === "ar" && "flex flex-col items-end"
              )}>
              <h1 className="text-xl font-medium">{dict.home.why.why2Title}</h1>
              <h3
                className={cn(
                  "text-sm text-[#CACACA]",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.why.why2SubTitle} <br />{" "}
                {dict.home.why.why2SubTitle2} <br />{" "}
                {dict.home.why.why2SubTitle3}
              </h3>
            </div>
          </div>
          <div
            className={cn(
              "flex items-center gap-5",
              lang === "en" ? "flex-row" : "flex-row-reverse"
            )}>
            <Separator
              orientation="vertical"
              className="bg-brand w-0.5 h-28 rounded-full"
            />
            <div
              className={cn(
                "space-y-5",
                lang === "ar" && "flex flex-col items-end"
              )}>
              <h1 className="text-xl font-medium">{dict.home.why.why3Title}</h1>
              <h3
                className={cn(
                  "text-sm text-[#CACACA]",
                  lang === "ar" && "text-right"
                )}>
                {dict.home.why.why3SubTitle} <br />{" "}
                {dict.home.why.why3SubTitle2} <br />{" "}
                {dict.home.why.why3SubTitle3}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;
