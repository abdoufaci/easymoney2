"use client";

import ChatStatusDropdown from "@/components/chat/chat-status-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DirectGroupWithMessages } from "@/types/types";
import { Group, MessageType, User } from "@prisma/client";
import { format } from "date-fns";
import { Lock, LockOpen } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  group: DirectGroupWithMessages;
}

function DirectChatCard({ group }: Props) {
  const pathname = usePathname();
  const groupLink = pathname.split("/")[4];

  const messageToShow = {
    AUDIO: "voice message",
    FILE: "file",
    IMAGE: "image",
    VIDEO: "video",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 pr-5 hover:bg-[#1FB4AB12] rounded-full",
        groupLink === group.id ? "bg-[#1FB4AB12]" : "bg-transparent"
      )}>
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            //@ts-ignore
            src={
              //@ts-ignore
              group.user?.image?.id
                ? `https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${
                    //@ts-ignore
                    group.user.image.id
                  }`
                : group.user?.image || ""
            }
            className="object-cover"
          />
          <AvatarFallback className="cursor-pointer">
            {group.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h1 className="text-lg font-medium">{group.user.name}</h1>
          {!!group.messages.length && (
            <h3 className="text-[#D4CDCD] text-xs">
              {group.messages[group.messages.length - 1]?.type === "TEXT"
                ? group.messages[group.messages.length - 1]?.message
                : //@ts-ignore
                  messageToShow[
                    group.messages[group.messages.length - 1]?.type
                  ]}
            </h3>
          )}
        </div>
      </div>
      {!!group.messages.length && (
        <h3 className="text-[#D4CDCD] text-xs">
          {format(group.messages[group.messages.length - 1].createdAt, "EEE")}
        </h3>
      )}
    </div>
  );
}

export default DirectChatCard;
