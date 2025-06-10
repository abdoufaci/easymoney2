"use client";

import { GroupWithMembersWithMessages } from "@/types/types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTransition } from "react";
import { GroupStatus } from "@prisma/client";
import { changeChatStatus } from "@/backend/mutations/chat/change-chat-status";
import { toast } from "sonner";

interface Props {
  group: GroupWithMembersWithMessages | null;
}

function ChatStatusDropdown({ group }: Props) {
  const [isPending, startTransition] = useTransition();

  const onClick = (status: GroupStatus) => {
    startTransition(() => {
      changeChatStatus(group?.id || "", status)
        .then(() => toast.success("Status changed !"))
        .catch(() => toast.error("Something went wrong ."));
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={
              group?.status === "OPEN"
                ? "open"
                : group?.status === "PRIVATE"
                ? "private"
                : "close"
            }
            className="rounded-full h-7 px-4 flex items-center">
            {group?.status === "OPEN" ? (
              <h1>Active</h1>
            ) : group?.status === "PRIVATE" ? (
              <h1>Studying</h1>
            ) : (
              <h1>Closed</h1>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1">
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onClick("OPEN")}
            className="bg-[#1B432D]/85 text-[#11C866] hover:!text-[#11C866] hover:!bg-[#1B432D] focus-within:bg-[#1B432D] cursor-pointer">
            <h1>Open</h1>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onClick("PRIVATE")}
            className="bg-[#C88E113D] text-[#C88E11] hover:!text-[#C88E11] hover:!bg-[#C88E11]/35 focus-within:bg-[#C88E113D] cursor-pointer">
            <h1>Studying</h1>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onClick("CLOSED")}
            className="bg-[#FF00000F] text-[#FF0000] hover:!text-[#FF0000] hover:!bg-[#FF0000]/30 focus-within:bg-[#FF00000F] cursor-pointer">
            <h1>Closed</h1>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ChatStatusDropdown;
