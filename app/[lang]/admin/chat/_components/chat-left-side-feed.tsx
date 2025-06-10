"use client";

import { Group, User } from "@prisma/client";
import GroupList from "./chat-list";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import GroupSearch from "../../followup/_components/group-search";
import { SupportGroupWithMessages } from "@/types/types";
import ChatList from "./chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  groups: SupportGroupWithMessages[];
}

function ChatLeftSideFeed({ groups }: Props) {
  const pathname = usePathname();
  const isChatOpen = pathname.split("/").length === 5;

  return (
    <div
      className={cn("lg:!border-r", isChatOpen ? "hidden lg:!block" : "block")}>
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Chat</h1>
        </div>
        <GroupSearch />
      </div>
      <ScrollArea className="h-[70vh]">
        <div className="px-3">
          <ChatList groups={groups} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default ChatLeftSideFeed;
