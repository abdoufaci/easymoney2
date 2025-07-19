"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { getTestimonyGroups } from "@/backend/queries/testimoney/get-testimony-groups";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useKey, useMedia } from "react-use";

interface Props {
  testimonies: string[];
  dict: any;
  lang: any;
}

function Testimonials({ testimonies, dict, lang }: Props) {
  const [show, setShow] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-32 pb-40">
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-20 w-[90%] mx-auto",
          lang === "ar" && "flex-row-reverse"
        )}>
        <div className="space-y-1">
          <h1
            className={cn(
              "bg-[linear-gradient(133.7deg,_#FFFFFF_19.38%,_rgba(255,_255,_255,_0)_131.08%)] dark:text-white text-transparent bg-clip-text text-4xl min-h-14",
              lang === "ar" && "text-right"
            )}>
            {dict.home.testimonials.title}
          </h1>
          <h3 className={cn("text-[#BAB9B9]", lang === "ar" && "text-right")}>
            {dict.home.testimonials.subTitle}
          </h3>
        </div>
        <Separator
          orientation="vertical"
          className="w-0.5 rounded-full bg-brand h-20 sepBlur"
        />
        <div className="">
          <h1 className="text-4xl font-semibold text-brand">80+</h1>
          <h3>
            {lang === "en"
              ? dict.home.testimonials.satisfied
              : dict.home.testimonials.student}{" "}
            <br />{" "}
            {lang === "en"
              ? dict.home.testimonials.student
              : dict.home.testimonials.satisfied}
          </h3>
        </div>
        <div className="">
          <h1 className="text-4xl font-semibold text-brand">07+</h1>
          <h3>
            {lang === "en"
              ? dict.home.testimonials.followUp
              : dict.home.testimonials.groups}{" "}
            <br />{" "}
            {lang === "en"
              ? dict.home.testimonials.groups
              : dict.home.testimonials.followUp}
          </h3>
        </div>
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="w-[90%] md:!w-[80%] mx-auto grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-5 gap-5 
      relative">
        <div
          className={cn(
            "absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-200 ease-out",
            show ? "opacity-100" : "opacity-0"
          )}>
          <Link href={"/testimonials"}>
            <Button variant={"success"} className="rounded-full md:!w-40">
              {dict.home.testimonials.watchMore}
            </Button>
          </Link>
        </div>
        <div className="w-full h-full testimoniesBg absolute bottom-0 left-0 pointer-events-none" />
        {testimonies.slice(0, isMobile ? 2 : 10).map((id) => (
          <iframe
            key={id}
            src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${id}`}
            allow="fullscreen"
            allowFullScreen
            className="w-full aspect-auto h-[500px]"></iframe>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
