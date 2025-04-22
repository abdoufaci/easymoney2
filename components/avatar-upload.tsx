"use client";

import { Minus, Star, XIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { deleteFiles } from "@/backend/mutations/delete-file";
import { Button } from "./ui/button";

interface AvatarImageUploadProps {
  onChange: (url?: { url: string; key: string }) => void;
  value?: {
    url: string;
    key: string;
  } | null;
  endpoint: "imageUploader" | "labelFile" | "logoUploader";
}

export const AvatarImageUpload = ({
  onChange,
  value,
  endpoint = "imageUploader",
}: AvatarImageUploadProps) => {
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
    return endpoint === "labelFile" ? (
      <div>
        The file desing is not ready yet
        <XIcon
          className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer"
          onClick={() => mutate(value)}
        />
      </div>
    ) : endpoint === "imageUploader" ? (
      <div className="w-64 flex justify-start relative">
        <Image
          key={value.key}
          alt="image"
          src={value.url || ""}
          height={600}
          width={300}
          className="rounded-md w-full h-52 object-cover"
        />
        <Button
          onClick={() => mutate(value)}
          variant={"delete"}
          className="rounded-full h-5 w-5 p-0 flex items-center justify-center bg-[#FF000029] border-none absolute top-3 right-3">
          <Minus className="h-1 w-1" />
        </Button>
      </div>
    ) : (
      <div className="w-52 h-52 relative">
        <div className="w-52 h-52 rounded-full bg-black/50 absolute top-0 left-0" />
        <Image
          key={value.key}
          alt="image"
          src={value.url || ""}
          height={600}
          width={300}
          className="rounded-full w-52 h-52 object-cover"
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
        toast.loading("uploading...");
      }}
      onClientUploadComplete={(res) => {
        toast.dismiss();
        const convertedRes = res.map((res) => ({
          url: res.url,
          key: res.key,
        }));
        onChange(convertedRes[0]);
      }}
      config={{
        mode: "auto",
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      className={cn(
        "flex items-center justify-center ut-button:ring-offset-0 ut-button:py-2 ut-button:h-full ut-button:ring-0 ut-button:!bg-brand  ut-button:focus-within:ring-offset-0 ut-button:focus-within:ring-0 ut-button:active:ring-0 ut-button:after:!bg-brand",
        endpoint === "imageUploader"
          ? "w-full !rounded-md !h-16"
          : "!h-52 !w-52 overflow-visible"
      )}
      content={{
        label: " ",
        uploadIcon: (
          <Image
            src={
              endpoint === "imageUploader"
                ? "/upload-thumbnail.svg"
                : "/upload.svg"
            }
            alt="upload"
            height={150}
            width={1000}
            className={cn(
              "",
              endpoint === "imageUploader" && "w-full object-cover",
              endpoint === "logoUploader" && "w-52 h-52 rounded-full"
            )}
          />
        ),
      }}
      appearance={{
        container: {
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          height: "100%",
          borderRadius: "9999px",
          padding: endpoint === "imageUploader" ? "0px" : "",
        },
        allowedContent: "hidden",
        button: "hidden",
      }}
    />
  );
};
