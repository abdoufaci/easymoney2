"use client";

import { Group, User } from "@prisma/client";
import AddGroupButton from "./add-group-button";
import GroupSearch from "./group-search";
import GroupList from "./group-list";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  groups: (Group & {
    members: User[];
  })[];
}

function FollowupLeftSideFeed({ groups }: Props) {
  const pathname = usePathname();
  const isChatOpen = pathname.split("/").length === 5;

  return (
    <div
      className={cn("lg:!border-r", isChatOpen ? "hidden lg:!block" : "block")}>
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">FollowUp</h1>
          <AddGroupButton />
        </div>
        <GroupSearch />
      </div>
      <div className="px-3">
        <GroupList groups={groups} />
      </div>
    </div>
  );
}

export default FollowupLeftSideFeed;
