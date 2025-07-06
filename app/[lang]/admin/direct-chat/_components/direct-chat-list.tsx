"use client";

import { cn } from "@/lib/utils";
import { Group, User } from "@prisma/client";
import Link from "next/link";
import GroupCard from "./direct-chat-card";
import { useSearchParams } from "next/navigation";
import { DirectGroupWithMessages } from "@/types/types";
import ChatCard from "./direct-chat-card";

interface Props {
  groups: DirectGroupWithMessages[];
}

function DirectChatList({ groups }: Props) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  return groups
    .filter(
      (item) =>
        item.user.name
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase().trim()) ||
        item.user.studentNumber?.includes(searchTerm?.trim())
    )
    ?.map((group, idx) => (
      <div
        key={group.id}
        className={cn("py-1", idx === groups.length - 1 ? "" : "border-b")}>
        <Link href={`/admin/direct-chat/${group.id}`}>
          <ChatCard group={group} />
        </Link>
      </div>
    ));
}

export default DirectChatList;
