"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { SectionWithCourses } from "@/types/types";
import { Plus } from "lucide-react";

interface Props {
  groupId: string;
}

function AddTestimonyButton({ groupId }: Props) {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addTestimony", { groupId })}
      className="rounded-full h-7 w-7 p-0 flex items-center justify-center"
      variant={"addSection"}>
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export default AddTestimonyButton;
