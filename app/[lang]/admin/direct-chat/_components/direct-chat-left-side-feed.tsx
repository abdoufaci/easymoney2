"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import GroupSearch from "../../followup/_components/group-search";
import { DirectGroupWithMessages } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import DirectChatList from "./direct-chat-list";

interface Props {
  groups: DirectGroupWithMessages[];
}

function DirectChatLeftSideFeed({ groups }: Props) {
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
          <DirectChatList groups={groups} />
        </div>
      </ScrollArea>
    </div>
  );
}

export default DirectChatLeftSideFeed;
