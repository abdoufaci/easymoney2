import { deleteMessage } from "@/backend/mutations/chat/delete-message";
import AudioPlayer from "@/components/chat/audio-player";
import { FileIcon } from "@/components/svgs/file-icon";
import { GreenFileIcon } from "@/components/svgs/green-file-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { GroupMessageWithUser } from "@/types/types";
import { MessageType } from "@prisma/client";
import { format } from "date-fns";
import { EllipsisVertical, File } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  message: GroupMessageWithUser;
  isChat: boolean;
}

function GroupMessage({ message, isChat }: Props) {
  const user = useCurrentUser();
  const { onOpen } = useModal();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const file = message?.file
    ? (message.file as {
        id: string;
        type: string;
      })
    : null;

  const downloadUploadthingFiles = async (fileUrls: string[]) => {
    if (isDownloading) return; // Prevent multiple downloads at the same time
    setIsDownloading(true);
    toast.loading("Downloading files...", {
      id: "download-files",
    });
    for (const fileUrl of fileUrls) {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          console.error(`Failed to download file: ${fileUrl}`);
          continue;
        }

        const blob = await response.blob();
        const fileName = decodeURIComponent(
          fileUrl.split("/").pop() || "downloaded-file"
        );

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();

        // Clean up
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Error downloading file: ${fileUrl}`, error);
      }
    }
    setIsDownloading(false);
    toast.dismiss("download-files");
  };

  const onDeleteMessage = () => {
    startTransition(() => {
      deleteMessage(message.id, message.type, file, isChat)
        .then(() => toast.success("message deleted !"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div
      className={cn(
        "w-full flex group items-center gap-5",
        user?.id === message.userId ? "justify-end" : "justify-start"
      )}>
      {user?.id === message.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="text-white h-5 w-5 cursor-pointer hidden group-hover:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={isPending}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDeleteMessage();
              }}
              className="bg-[#FF00000F] text-[#FF0000] hover:!text-[#FF0000] hover:!bg-[#FF00000F] focus-within:bg-[#FF00000F] cursor-pointer">
              <h1>Delete</h1>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div
        className={cn(
          "flex gap-3 items-start",
          user?.id === message.userId ? "flex-row-reverse" : "flex-row"
        )}>
        <Avatar className="h-12 w-12">
          <AvatarImage
            //@ts-ignore
            src={
              user?.role === "USER" && user?.id !== message.userId
                ? "/support.svg"
                : //@ts-ignore
                message.user?.image?.id
                ? `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${
                    //@ts-ignore
                    message.user.image.id
                  }`
                : message.user?.image || ""
            }
            className="object-cover"
          />
          <AvatarFallback className="bg-brand/10 cursor-pointer">
            {message.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "flex flex-col gap-2",
            user?.id === message.userId ? "items-end" : "items-start"
          )}>
          <h1 className="text-[#AAAAAA] text-sm font-semibold">
            {message.user.name}
          </h1>
          <div
            onClick={() => {
              if (message.type === "FILE" && file) {
                downloadUploadthingFiles([file.id]);
              }
            }}
            className={cn(
              "w-full max-w-[400px] message",
              user?.id === message.userId
                ? "rounded-l-[19.14px] rounded-br-[19.14px] bg-[#1FB4AB]"
                : "rounded-r-[19.14px] rounded-bl-[19.14px] bg-[#1A1D24]",
              message.type === "AUDIO" ? "p-1" : "p-3",
              message.type === "FILE" && file && "cursor-pointer"
            )}>
            {message.type === "FILE" && file && (
              <div className="flex items-center gap-4 mr-20">
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center",
                    user?.id === message.userId
                      ? "bg-[#FFFFFF69]"
                      : "bg-[#1FB4AB33]"
                  )}>
                  {user?.id === message.userId ? (
                    <FileIcon />
                  ) : (
                    <GreenFileIcon />
                  )}
                </div>
                <div className="space-y-0">
                  <h1 className="text-white font-medium">{"Document"}</h1>
                </div>
              </div>
            )}
            {message.type === "VIDEO" && file && (
              <iframe
                key={file.id}
                src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${file.id}`}
                allow="fullscreen"
                allowFullScreen
                className="aspect-video w-full max-w-sm"></iframe>
            )}
            {message.type === "IMAGE" && file && (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${file.id}`}
                alt="chat-image"
                layout="intrinsic"
                width={300}
                height={600}
                className="w-full max-w-xs cursor-pointer"
                onClick={() => onOpen("imageExpanded", { image: file.id })} // Open image in modal
              />
            )}
            {message.type === "AUDIO" && (
              <AudioPlayer
                content={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${file?.id}`}
                isMyMessage={user?.id === message.userId}
              />
            )}
            {message.type === "TEXT" && (
              <p className="text-sm text-white">{message.message}</p>
            )}
          </div>
          <h1 className="text-[#D2D2D2] text-xs font-medium">
            {format(message.createdAt, "h:mm a")}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GroupMessage;
