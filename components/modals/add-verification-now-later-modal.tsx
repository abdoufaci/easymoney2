"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { AddSectionForm } from "../forms/add-section-form";
import { AddCourseForm } from "../forms/add-course-form";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { AddVerificationDocumentForm } from "../forms/add-verification-document-form";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export const AddVerificationNowLaterModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const dict = data?.dict;

  const isModalOpen = isOpen && type === "verifyNowLater";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-gradient-to-b from-[#FFFFFF14] to-[#FFFFFF0A] border border-[#FFFFFF3B] !rounded-md w-full max-w-2xl ">
        <DialogHeader className="py-2">
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <DialogTitle className="text-xl font-medium">
              {dict?.settings?.verifyAccount}
            </DialogTitle>
            <DialogDescription className="text-[#E3DEDE] text-sm whitespace-break-spaces">
              {dict?.verify?.verifyAccountDesc}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center items-center gap-7">
          <div className="flex items-center gap-1.5">
            <h1 className="font-medium text-lg">{dict?.verify?.why}</h1>
            <ArrowDown className="h-5 w-5 text-white" />
          </div>
          <div className="w-full aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1078663298?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              width="1920"
              height="1080"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="ID video"
              className="w-full h-full"></iframe>
          </div>
          <div className="w-full md:!w-[80%] mx-auto flex max-md:!flex-col items-center gap-5 justify-center">
            <Button
              variant={"whiteOutline"}
              size={"xl"}
              className="rounded-full w-full"
              asChild
              onClick={() => onClose()}>
              <Link href={"/dashboard/settings"}>
                {dict?.verify?.verifyNow}
              </Link>
            </Button>
            <Button
              variant={"brand"}
              size={"xl"}
              className="rounded-full w-full"
              asChild>
              <Link href={"https://t.me/EasymoneySupport2"} target="_blank">
                {dict?.verify?.verifyLater}
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
