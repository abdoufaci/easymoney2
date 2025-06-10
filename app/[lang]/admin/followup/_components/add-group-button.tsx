"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { Plus } from "lucide-react";
import React from "react";

function AddGroupButton() {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("addGroup")}
      className="rounded-full h-7 w-7 p-0 flex items-center justify-center"
      variant={"addSection"}>
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export default AddGroupButton;
