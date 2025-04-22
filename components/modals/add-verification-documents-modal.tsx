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

export const AddVerificationDocumentsModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const dict = data?.dict;

  const isModalOpen = isOpen && type === "addVerificationDocuments";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-[#FFFFFF21] border border-[#FFFFFF3B] !rounded-[38.87px] w-full max-w-lg ">
        <DialogHeader className="py-2">
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <DialogTitle className="text-xl font-semibold text-left">
              {dict?.settings?.AccountVerification}
            </DialogTitle>
            <DialogDescription className="text-[#BCBABA]">
              {dict?.settings?.pleasAdd}
            </DialogDescription>
          </div>
        </DialogHeader>
        <AddVerificationDocumentForm />
      </DialogContent>
    </Dialog>
  );
};
