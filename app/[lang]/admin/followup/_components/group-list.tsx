"use client";

import { cn } from "@/lib/utils";
import { Group, User } from "@prisma/client";
import Link from "next/link";
import GroupCard from "./group-card";
import { useSearchParams } from "next/navigation";

interface Props {
  groups: (Group & {
    members: User[];
  })[];
}

function GroupList({ groups }: Props) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  return groups
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm?.toLowerCase().trim())
    )
    ?.map((group, idx) => (
      <div
        key={group.id}
        className={cn("py-1", idx === groups.length - 1 ? "" : "border-b")}>
        <Link href={`/admin/followup/${group.id}`}>
          <GroupCard group={group} />
        </Link>
      </div>
    ));
}

export default GroupList;
