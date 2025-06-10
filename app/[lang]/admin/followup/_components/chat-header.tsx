import { Button } from "@/components/ui/button";
import { GroupWithMembersWithMessages } from "@/types/types";
import { User } from "@prisma/client";
import { ArrowLeft, Lock, LockOpen } from "lucide-react";
import AddGroupMemberButton from "./add-member-button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MembersDetails from "./members-details";
import ChatStatusDropdown from "@/components/chat/chat-status-dropdown";
import Link from "next/link";

interface Props {
  group: GroupWithMembersWithMessages | null;
}

function ChatHeader({ group }: Props) {
  if (!group) {
    return null;
  }

  const items = group.members
    .map((member, idx) => ({
      id: idx,
      name: member.name || "",
      image: member.image,
    }))
    .slice(0, 3);

  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div className="flex items-center gap-4">
          <Link href={"/admin/followup"} className="lg:!hidden">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-semibold">{group?.name}</h1>
          <ChatStatusDropdown group={group} />
        </div>
        {!!group.members.length ? (
          <Sheet>
            <SheetTrigger>
              <div className="pr-5 flex items-center gap-5 cursor-pointer group">
                <div className="flex items-center gap-2">
                  <AnimatedTooltip items={items} />
                </div>
                {group.members.length > 3 && (
                  <h1 className="group-hover:underline">
                    +{group.members.length - 3}
                  </h1>
                )}
              </div>
            </SheetTrigger>
            <SheetContent>
              <MembersDetails group={group} />
            </SheetContent>
          </Sheet>
        ) : (
          <AddGroupMemberButton group={group} />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
