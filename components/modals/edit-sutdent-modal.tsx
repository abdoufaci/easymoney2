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
import { EditStudentForm } from "../forms/edit-student-form";

export const EditStudentModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isModalOpen = isOpen && type === "editStudent";

  const isVerify = data?.isVerify;
  const user = data?.user;
  const dict = data?.dict;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() =>
        isVerify ? onOpen("verifyDocuments", { user, dict }) : onClose()
      }>
      <DialogContent
        showCloseButton
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-[#FFFFFF21] border border-[#FFFFFF3B] !rounded-[38.87px] w-full max-w-2xl ">
        <DialogHeader className="py-2">
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <DialogTitle className="text-xl font-semibold"></DialogTitle>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[500px] overflow-y-visible">
          <EditStudentForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
