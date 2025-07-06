"use client";

import ChatBody from "@/app/[lang]/admin/followup/_components/chat-body";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ChatInput from "@/app/[lang]/admin/followup/_components/chat-input";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";

interface Props {
  groupId: string;
}

function SupportSheet({ groupId }: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"addSection"} className="h-8 w-8 rounded-full">
          <MessageCircleMore className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="!p-0">
        <div className="h-screen flex flex-col relative">
          <ChatBody groupId={groupId} isDirectChat />
          <ChatInput groupId={groupId} isDirectChat />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SupportSheet;
