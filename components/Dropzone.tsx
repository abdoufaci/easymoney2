"use client";

import { deleteEverythingFile } from "@/backend/mutations/delete-everthing-file";
import { cn } from "@/lib/utils";
import { Minus, XIcon } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import DropzoneComponent from "react-dropzone";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  isMutliple?: boolean;
  onDrop: (files: any) => void;
  imageUrl?: string;
  accept?: string;
  documentVerification?: boolean;
}

function Dropzone({
  isMutliple = false,
  imageUrl,
  onDrop: onDropCompleted,
  accept = "image/*",
  documentVerification = false,
}: Props) {
  const [isPending, startTranstion] = useTransition();

  const onDrop = async (selectedFiles: File[]) => {
    toast.loading("Uploading files...", { id: "uploading" });
    startTranstion(async () => {
      try {
        const formData = new FormData();
        for (const file of selectedFiles) {
          formData.append("imageFile", file); // Same name as <input name="videos">
        }

        const response = await fetch("/api/upload-everything", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          onDropCompleted(isMutliple ? data.files : data.files[0]);
        } else {
          toast.error(data.message || "File upload failed.");
        }
      } catch (err) {
        console.log({ err });
        toast.error("An unexpected error occurred.");
      } finally {
        toast.dismiss("uploading");
      }
    });
  };

  const maxSize = 10737418240; // 10 GB in bytes

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      multiple={isMutliple}
      onDrop={(acceptedFiles: File[]) => onDrop(acceptedFiles)}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4 w-full">
            <div
              {...getRootProps()}
              className={cn(
                "w-full min-w-[300px] justify-center items-center p-5 rounded-lg text-center h-fit",
                isDragActive && !imageUrl
                  ? "bg-brand text-white animate-pulse"
                  : !imageUrl
                  ? "bg-[#1fb4ab12]"
                  : "",
                imageUrl ? "" : "border border-brand/30 flex border-dashed",
                documentVerification ? "bg-[#1fb4ab12] h-16" : "max-w-sm h-52"
              )}>
              <input
                disabled={isPending}
                {...getInputProps()}
                accept={accept}
              />
              {!isDragActive && (
                <Image
                  alt="Drop files here"
                  src={imageUrl || "/upload_msg.svg"}
                  width={documentVerification ? 350 : imageUrl ? 150 : 70}
                  height={documentVerification ? 350 : imageUrl ? 150 : 70}
                  className={cn(
                    imageUrl &&
                      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
                  )}
                />
              )}
              {isDragActive && !isDragReject && "drop to upload this file !"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
