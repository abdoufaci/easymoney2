"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { AddSectionForm } from "../forms/add-section-form";
import { AddCourseForm } from "../forms/add-course-form";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { AddVerificationDocumentForm } from "../forms/add-verification-document-form";
import VerifyDocumentsBody from "../forms/verify-documents-body";
import { VerificationStatus } from "@prisma/client";
import { decideDocument } from "@/backend/mutations/users/decide-document";
import { toast } from "sonner";

export const VerifyDocumentsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const dict = data?.dict;
  const user = data?.user;

  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === "verifyDocuments";

  const onClick = async (VerificationStatus: VerificationStatus) => {
    startTransition(() => {
      decideDocument(
        VerificationStatus,
        //@ts-ignore
        user
      )
        .then(() => {
          toast.success("status updated successfully!");
          onClose();
        })
        .catch((error) => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-[#FFFFFF21] border border-[#FFFFFF3B] !rounded-[38.87px] w-full max-w-5xl ">
        <DialogHeader className="py-2">
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <DialogTitle className="text-xl font-semibold">
              {dict?.settings?.accountVerification}
            </DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[500px] overflow-y-visible">
          <VerifyDocumentsBody />
        </ScrollArea>
        <DialogFooter>
          <div className="flex items-center gap-5 w-full">
            <Button
              disabled={isPending}
              onClick={() => onClick("REJECTED")}
              variant={"delete"}
              size={"xl"}
              className="w-full rounded-full bg-[#F63F4B1F]">
              {dict?.settings?.reject}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => onClick("VERIFIED")}
              variant={"brand"}
              size={"xl"}
              className="w-full rounded-full">
              {dict?.settings?.accept}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
