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

export const AddSectionModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen =
    isOpen && (type === "addSection" || type === "addTestemonyGroup");

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-gradient-to-b from-[#40414F]/30 to-[#1B1B1F]/30 dialogContentBlur w-full max-w-3xl ">
        <DialogHeader className="py-2 ">
          <DialogTitle className="text-xl font-semibold text-left">
            Adding New {type === "addTestemonyGroup" ? "Group" : "Section"}
          </DialogTitle>
        </DialogHeader>
        <AddSectionForm />
      </DialogContent>
    </Dialog>
  );
};
