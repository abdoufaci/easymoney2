import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  dict: any;
  lang: any;
}

function FreeCourse({ dict, lang }: Props) {
  return (
    <div className="grid grid-cols-1 lg:!grid-cols-2 place-items-center place-content-center gap-5 w-[90%] mx-auto pt-20 pb-40">
      <Image
        alt="freeCourse"
        src={"/freecourse.svg"}
        height={600}
        width={600}
        className="object-cover"
      />
      <div className="space-y-14">
        <div className="space-y-5">
          <h1
            className={cn(
              "text-3xl font-medium",
              lang === "ar" && "text-right"
            )}>
            {dict.home.free.title}
          </h1>
          <p
            className={cn(
              "text-[#D3D1D1] text-sm",
              lang === "ar" && "text-right"
            )}>
            {dict.home.free.subTitle1} <br /> {dict.home.free.subTitle2} <br />{" "}
            {dict.home.free.subTitle3}{" "}
          </p>
        </div>
        <div className="space-y-5">
          <h1 className={cn("text-white", lang === "ar" && "text-right")}>
            {dict.home.free.whatTitle}
          </h1>
          <div className={cn("", lang === "ar" && "text-right")}>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}1{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what1}</h1>
            </div>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}2{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what2}</h1>
            </div>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}3{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what3}</h1>
            </div>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}4{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what4}</h1>
            </div>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}5{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what5}</h1>
            </div>
            <div
              className={cn(
                "text-[#D3D1D1] flex gap-1",
                lang === "en" ? "flex-row" : "flex-row-reverse"
              )}>
              <span>
                {lang === "ar" && "."}6{lang === "en" && "."}
              </span>{" "}
              <h1> {dict.home.free.what6}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeCourse;
