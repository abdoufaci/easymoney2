import { GroupWithMembersWithMessages } from "@/types/types";
import ChatBody from "./chat-body";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { User } from "@prisma/client";

interface Props {
  group: GroupWithMembersWithMessages | null;
}

function Chat({ group }: Props) {
  return (
    <div className="h-[90vh] flex flex-col relative">
      <ChatHeader group={group} />
      <ChatBody groupId={group?.id || ""} />
      <ChatInput groupId={group?.id || ""} />
    </div>
  );
}

export default Chat;
