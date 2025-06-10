"use client";

import ChatStatusDropdown from "@/components/chat/chat-status-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Group, User } from "@prisma/client";
import { Lock, LockOpen } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  group: Group & {
    members: User[];
  };
}

function GroupCard({ group }: Props) {
  const pathname = usePathname();
  const groupLink = pathname.split("/")[4];

  return (
    <div
      className={cn(
        "flex items-center justify-between p-5 hover:bg-[#1FB4AB12] rounded-full",
        groupLink === group.id ? "bg-[#1FB4AB12]" : "bg-transparent"
      )}>
      <h1 className="">
        {group.name}
        <span className="text-xs text-[#1FB4AB] ml-2">
          {group.members.length} Members
        </span>
      </h1>
      <ChatStatusDropdown
        //@ts-ignore
        group={group}
      />
    </div>
  );
}

export default GroupCard;
