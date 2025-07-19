"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { AddSectionForm } from "../forms/add-section-form";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { deleteStudent } from "@/backend/mutations/users/delete-student";
import { toast } from "sonner";

export const DeleteStudentModal = () => {
  const { isOpen, onClose, type, onOpen, data } = useModal();
  const [isPending, startTranstion] = useTransition();

  const isModalOpen = isOpen && type === "deleteStudent";

  const isVerify = data?.isVerify;
  const user = data?.user;
  const dict = data?.dict;

  const onDelete = () => {
    startTranstion(() => {
      deleteStudent(user?.id)
        .then(() => {
          toast.success("Student deleted !");
          onClose();
        })
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => onOpen("editStudent", { user, dict, isVerify })}>
      <DialogContent
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-gradient-to-b from-[#40414F]/30 to-[#1B1B1F]/30 dialogContentBlur w-full max-w-xl ">
        <DialogHeader className="py-2 ">
          <DialogTitle className="text-xl font-semibold text-left"></DialogTitle>
        </DialogHeader>
        <h1 className="text-lg font-medium text-center">
          You Sure you want to delete{" "}
          <span className="text-brand">@{user?.name}</span> of the email{" "}
          <span className="text-brand">dozkjdozd@gmail.com</span>
        </h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onOpen("editStudent", { user, dict, isVerify })}
            variant={"white"}
            size={"lg"}
            className="w-full rounded-full">
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={onDelete}
            type="button"
            variant={"close"}
            size={"lg"}
            className="w-full rounded-full">
            Delete Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
