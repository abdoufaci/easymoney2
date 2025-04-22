"use client";

import { Star, XIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { deleteFiles } from "@/backend/mutations/delete-file";

interface VerificationDocumentImageUploadProps {
  onChange: (url?: { url: string; key: string }) => void;
  value?: {
    url: string;
    key: string;
  } | null;
  endpoint: "imageUploader" | "labelFile" | "logoUploader";
  src: string;
}

export const VerificationDocumentImageUpload = ({
  onChange,
  value,
  endpoint = "imageUploader",
  src,
}: VerificationDocumentImageUploadProps) => {
  const { data } = useModal();
  const [isPending, startTransition] = useTransition();

  const mutate = (image: { url: string; key: string }) => {
    toast.loading("removing...");
    startTransition(() => {
      deleteFiles([image])
        .then((data) => onChange(undefined))
        .catch(() => toast.error("Something went wrong, try again."))
        .finally(() => toast.dismiss());
    });
  };

  if (value) {
    return (
      <div className="w-[250px] h-[160px] relative">
        <div className="w-full h-full bg-black/50 absolute top-0 left-0" />
        <Image
          key={value.key}
          alt="image"
          src={value.url || ""}
          height={600}
          width={300}
          className=" w-full h-full object-cover"
        />
        <div className="flex items-center gap-5 absolute top-2 right-2">
          <XIcon
            className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer"
            onClick={() => mutate(value)}
          />
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onUploadProgress={() => {
        toast.dismiss();
        toast.loading("uploading...", {
          duration: 10,
        });
      }}
      onClientUploadComplete={(res) => {
        toast.dismiss();
        const convertedRes = res.map((res) => ({
          url: res.url,
          key: res.key,
        }));
        onChange(convertedRes[0]);
        toast.dismiss();
      }}
      config={{
        mode: "auto",
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      className={cn(
        "relative flex items-center justify-center ut-button:ring-offset-0 ut-button:py-2 ut-button:h-full ut-button:ring-0 ut-button:!bg-brand ut-button:ut-readying:!bg-brand/50 ut-button:focus-within:ring-offset-0 ut-button:focus-within:ring-0 ut-button:active:ring-0 ut-button:after:!bg-brand w-full !rounded-md !h-5"
      )}
      content={{
        label: " ",
        uploadIcon: (
          <Image
            src={src}
            alt="upload"
            height={40}
            width={40}
            className={cn(
              "w-full h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            )}
          />
        ),
      }}
      appearance={{
        container: {
          backgroundColor: "#2979FF21",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          borderRadius: "9999px",
        },
        allowedContent: "hidden",
        button: "hidden",
      }}
    />
  );
};
