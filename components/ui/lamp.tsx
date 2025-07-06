"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import CipherVideo from "../cipher-video";
import { Button } from "./button";

interface Props {
  otp: any;
  playbackInfo: any;
}

export function LampDemo({ otp, playbackInfo }: Props) {
  return (
    <LampContainer className="w-full">
      {/* <motion.div
        initial={{ opacity: 0.5, y: 600 }}
        whileInView={{ opacity: 1, y: 400 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="-mt-96 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl 
        font-medium md:!text-7xl space-y-20">
        <div className="space-y-5">
          <h1>Follow Up</h1>
          <p className="text-sm font-normal w-full max-w-4xl">
            Lorem ipsum dolor sit amet consectetur. Dui donec arcu viverra
            interdum elementum tincidunt. Commodo aenean tempus ut habitasse
            scelerisque dapibus sit sed. Massa rhoncus amet in sem massa ut
            viverra. Cras quis porta eget nec viverra est est.
          </p>
        </div>

        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
          style={{ border: 0 }}
          allowFullScreen={true}
          allow="encrypted-media"
          className="w-full aspect-video"></iframe>
      </motion.div> */}
      <motion.div
        initial={{ opacity: 0.5, y: 550 }}
        whileInView={{ opacity: 1, y: 470 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="-mt-[450px] bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl 
        font-medium md:!text-7xl space-y-16 w-full flex flex-col items-center justify-center ">
        <div className="space-y-5">
          <h1>Follow Up</h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-10 gap-5 w-full">
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
            style={{ border: 0 }}
            allowFullScreen={true}
            allow="encrypted-media"
            className="w-full max-w-5xl aspect-video"></iframe>
        </div>
      </motion.div>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#07080A] w-full rounded-md z-0",
        className
      )}>
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-brand via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]">
          <div className="absolute  w-[100%] left-0 bg-[#07080A] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-[#07080A]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-brand text-white [--conic-position:from_290deg_at_center_top]">
          <div className="absolute  w-40 h-[100%] right-0 bg-[#07080A]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-[#07080A] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#07080A] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-brand opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-brand blur-2xl"></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-brand "></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#07080A] "></div>
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 w-full">
        {children}
      </div>
    </div>
  );
};
