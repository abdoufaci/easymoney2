"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import Image from "next/image";

export const ImageExpandedModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();

  const isModalOpen = isOpen && type === "imageExpanded";

  if (!isModalOpen) {
    return;
  }

  const { image, isUploadthing, user, dict } = data;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() =>
        isUploadthing
          ? onOpen("verifyDocuments", {
              user,
              dict,
            })
          : onClose()
      }>
      <DialogContent className="bg-transparent outline-none border-none shadow-none text-black w-full max-w-xl [&>button]:hidden">
        <DialogHeader className="py-2 hidden"></DialogHeader>
        <Image
          src={
            image?.includes("gz4kd9hgc7.ufs.sh") || image?.includes("utfs.io")
              ? image || ""
              : `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${image}`
          }
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
