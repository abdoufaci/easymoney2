"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import Image from "next/image";

export const ImageExpandedModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "imageExpanded";

  if (!isModalOpen) {
    return;
  }

  const { image } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent outline-none border-none shadow-none text-black w-full max-w-xl [&>button]:hidden">
        <DialogHeader className="py-2 hidden"></DialogHeader>
        <Image
          src={image || ""}
          alt="chat-image"
          layout="intrinsic"
          width={300}
          height={600}
          className="w-full max-w-lg"
        />
      </DialogContent>
    </Dialog>
  );
};
