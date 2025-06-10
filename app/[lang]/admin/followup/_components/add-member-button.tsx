"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { GroupWithMembersWithMessages } from "@/types/types";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";

interface Props {
  group: GroupWithMembersWithMessages | null;
}

function AddGroupMemberButton({ group }: Props) {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addGroupMember", { group })}
      className="rounded-full h-7 w-7 p-0 flex items-center justify-center"
      variant={"addSection"}>
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export default AddGroupMemberButton;
