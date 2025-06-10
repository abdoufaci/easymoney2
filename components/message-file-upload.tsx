"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useModal } from "@/hooks/useModalStore";
import { deleteFiles } from "@/backend/mutations/delete-file";
import Player from "next-video/player";
import { FileIcon } from "./svgs/file-icon";

interface MessageFileUploadProps {
  onChange: (url?: any[]) => void;
  value?: any[] | null;
}

export const MessageFileUpload = ({
  onChange,
  value,
}: MessageFileUploadProps) => {
  const { mutate } = useMutation({
    mutationFn: (image: any[]) => deleteFiles(image),
    onSuccess(data) {
      onChange(value?.filter((value) => !data?.includes(value.key)));
    },
    onError() {
      toast.error("Something went wrong, try again.");
    },
    onMutate() {
      toast.loading("removing...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <ScrollArea className="w-full max-w-3xl md:!max-w-3xl">
      {!!value?.length && value?.length > 1 && (
        <h1
          onClick={() => mutate(value)}
          className="underline font-semibold text-sm cursor-pointer">
          clear all images
        </h1>
      )}
      <div className="flex items-center gap-2 ">
        {value?.map(
          (
            image: {
              url: string;
              type: string;
              key: string;
              size: string;
              name: string;
            },
            idx
          ) =>
            image.type.includes("image") ? (
              <div key={idx} className="w-[250px] h-[185px] relative">
                <Image
                  key={image.key}
                  alt="image"
                  src={image.url || ""}
                  height={600}
                  width={300}
                  className="rounded-lg w-full h-full object-cover"
                />

                <XIcon
                  className="h-8 w-8 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer absolute top-2 right-2"
                  onClick={() => mutate([image])}
                />
              </div>
            ) : image.type.includes("pdf") ? (
              <div className="relative w-full">
                <div className="w-full max-w-[400px] rounded-[19.14px] p-3 bg-[#1FB4AB]">
                  <div className="flex items-start gap-4 mr-20">
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-[#FFFFFF69]">
                      <FileIcon />
                    </div>
                    <div className="space-y-0">
                      <h1 className="text-white font-medium">{image.name}</h1>
                      <h5 className="text-xs text-[#E3E3E3]">
                        {image.size} MB
                      </h5>
                    </div>
                  </div>
                </div>
                <XIcon
                  className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer absolute top-1 right-1"
                  onClick={() => mutate(value)}
                />
              </div>
            ) : (
              <div>
                <Player
                  src={image.url || ""}
                  className="w-full max-w-xs aspect-video rounded-lg"
                />
                <XIcon
                  className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer"
                  onClick={() => mutate(value)}
                />
              </div>
            )
        )}
        <UploadDropzone
          endpoint={"fileMessageUploader"}
          onUploadProgress={() => {
            toast.dismiss();
            toast.info(
              "uploading..., once it's done, it will be added to the modal"
            );
          }}
          onClientUploadComplete={(res) => {
            toast.dismiss();
            const convertedRes = res.map((res) => ({
              url: res.url,
              key: res.key,
              type: res.type,
              size: (res.size / (1024 * 1024)).toFixed(2),
              name: res.name,
            }));
            onChange([...(value ?? []), ...convertedRes]);
            toast.dismiss();
          }}
          config={{
            mode: "auto",
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
          className="!h-48 w-full ut-button:ring-offset-0 ut-button:py-2 ut-button:h-full ut-button:ring-0 
       ut-button:!bg-brand ut-button:ut-readying:!bg-brand/50 ut-button:focus-within:ring-offset-0
      ut-button:focus-within:ring-0 ut-button:active:ring-0 ut-button:after:!bg-brand"
          content={{
            label: " ",
            uploadIcon: (
              <Image
                src={"/upload_msg.svg"}
                alt="upload"
                height={50}
                width={50}
              />
            ),
          }}
          appearance={{
            container: {
              backgroundColor: "rgba(31, 180, 171, 0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            },
            allowedContent: "hidden",
            button: "hidden",
          }}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
