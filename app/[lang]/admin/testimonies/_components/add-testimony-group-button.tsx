"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

function AddTestimonyGroupButton() {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addTestemonyGroup")}
      size={"lg"}
      variant={"addSection"}
      className="rounded-full">
      <Plus className="h-4 w-4" />
      Add New Group
    </Button>
  );
}

export default AddTestimonyGroupButton;
