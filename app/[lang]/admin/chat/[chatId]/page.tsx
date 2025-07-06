import { getGroupChatById } from "@/backend/queries/chat/get-group-chat-by-id";
import { getSupportChatById } from "@/backend/queries/chat/get-support-chat-by-id";
import ChatBody from "../../followup/_components/chat-body";
import ChatInput from "../../followup/_components/chat-input";

interface Props {
  params: {
    chatId: string;
  };
}

async function ChatIdPage({ params: { chatId } }: Props) {
  const group = await getSupportChatById(chatId);

  return (
    <div className="h-[90vh] flex flex-col relative">
      <ChatBody groupId={group?.id || ""} isChat />
      <ChatInput groupId={group?.id || ""} isChat />
    </div>
  );
}

export default ChatIdPage;
