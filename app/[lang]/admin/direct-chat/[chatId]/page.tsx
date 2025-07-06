import { getGroupChatById } from "@/backend/queries/chat/get-group-chat-by-id";
import { getSupportChatById } from "@/backend/queries/chat/get-support-chat-by-id";
import ChatBody from "../../followup/_components/chat-body";
import ChatInput from "../../followup/_components/chat-input";
import { getDirectChatById } from "@/backend/queries/chat/get-direct-chat-by-id";

interface Props {
  params: {
    chatId: string;
  };
}

async function ChatIdPage({ params: { chatId } }: Props) {
  const group = await getDirectChatById(chatId);

  return (
    <div className="h-[90vh] flex flex-col relative">
      <ChatBody groupId={group?.id || ""} isDirectChat />
      <ChatInput groupId={group?.id || ""} isDirectChat />
    </div>
  );
}

export default ChatIdPage;
