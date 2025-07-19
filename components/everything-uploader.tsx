"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import { Button } from "./ui/button";
import { Minus, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Dropzone from "./Dropzone";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { deleteEverythingFile } from "@/backend/mutations/delete-everthing-file";

interface Props {
  onChange: (file?: { id: string; type: string }) => void;
  value?: {
    id: string;
    type: string;
  } | null;
  setImageToDelete: Dispatch<
    SetStateAction<{
      id: string;
      type: string;
    } | null>
  >;
  settings?: boolean;
  accept?: string;
  imageUrl?: string;
  documentVerification?: boolean;
}

export default function EverythingUploader({
  onChange,
  setImageToDelete,
  value,
  settings = false,
  accept = "image/*",
  imageUrl,
  documentVerification = false,
}: Props) {
  const { data } = useModal();

  const [deletePedning, startDeleteTransition] = useTransition();
  const [shouldRenderIframe, setShouldRenderIframe] = useState(false);

  const mutate = ({ id, type }: { id: string; type: string }) => {
    toast.loading("Deleting file...");
    startDeleteTransition(async () => {
      deleteEverythingFile({ id, type })
        .then((response) => {
          if (response?.success) {
            toast.success("File deleted successfully.");
            onChange(undefined);
          } else {
            toast.error("Failed to delete file.");
          }
        })
        .catch((error) => {
          toast.error("An error occurred while deleting the file.");
        })
        .finally(() => toast.dismiss());
    });
    toast.dismiss();
  };

  const addToBin = (value: { id: string; type: string }) => {
    setImageToDelete(value);
    onChange(undefined);
  };

  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        setShouldRenderIframe(true); // forces re-render
      }, 7000); // wait 7 seconds (adjust if needed)

      return () => clearTimeout(timer);
    }
  }, [value]);

  if (value) {
    return !settings ? (
      value.type === "video" ? (
        <div className="relative">
          <iframe
            key={value.id}
            src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${value.id}`}
            allow="fullscreen"
            allowFullScreen
            className="w-full max-w-[210px] aspect-auto h-[375px]"></iframe>
          <XIcon
            className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer absolute top-1 right-1"
            onClick={() => mutate(value)}
          />
        </div>
      ) : (
        <div className="w-64 flex justify-start relative">
          <Image
            alt="image"
            src={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${value.id}`}
            height={600}
            width={300}
            className="rounded-md w-full h-52 object-cover"
          />
          <Button
            type="button"
            disabled={deletePedning}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              !!data.course ? addToBin(value) : mutate(value);
            }}
            variant={"delete"}
            className="rounded-full h-5 w-5 p-0 flex items-center justify-center bg-[#FF000029] border-none absolute top-3 right-3">
            <Minus className="h-1 w-1" />
          </Button>
        </div>
      )
    ) : (
      <div
        className={cn(
          settings ? "flex flex-col items-center " : "w-52 h-52 relative"
        )}>
        {!settings && (
          <div className="w-52 h-52 rounded-full bg-black/50 absolute top-0 left-0" />
        )}
        {settings ? (
          <Avatar className="border-[10px] border-[#1FB4AB0F] h-52 w-52">
            <AvatarImage
              src={
                value.id
                  ? `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${value.id}`
                  : ""
              }
              className="object-cover rounded-full z-50"
            />
            <AvatarFallback className="bg-brand/10 cursor-pointer">
              EM
            </AvatarFallback>
          </Avatar>
        ) : (
          <Image
            alt="image"
            src={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${value.id}`}
            height={600}
            width={300}
            className="rounded-full w-52 h-52 object-cover"
          />
        )}
        {settings && (
          <Button
            type="button"
            onClick={() => {
              setImageToDelete(value);
              onChange(undefined);
            }}
            variant={"red_link"}>
            Remove
          </Button>
        )}
        {!settings && (
          <div className="flex items-center gap-5 absolute top-2 right-2">
            <XIcon
              className="h-7 w-7 text-[#ED2323] bg-[#EB16194A] rounded-full p-1.5 cursor-pointer"
              onClick={() => mutate(value)}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Dropzone
      onDrop={(files) => {
        onChange(files);
      }}
      imageUrl={settings ? "/upload.svg" : imageUrl}
      accept={accept}
      documentVerification={documentVerification}
    />
  );
}
