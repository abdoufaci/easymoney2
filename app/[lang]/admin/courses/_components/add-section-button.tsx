"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";

function AddSectionButton() {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addSection")}
      size={"lg"}
      variant={"addSection"}
      className="rounded-full">
      <Plus className="h-4 w-4" />
      Add Section
    </Button>
  );
}

export default AddSectionButton;
