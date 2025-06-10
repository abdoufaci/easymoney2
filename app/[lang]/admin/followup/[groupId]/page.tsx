import { getGroupChatById } from "@/backend/queries/chat/get-group-chat-by-id";
import Chat from "../_components/chat";

interface Props {
  params: {
    groupId: string;
  };
}

async function ChatIdPage({ params: { groupId } }: Props) {
  const group = await getGroupChatById(groupId);

  return <Chat group={group} />;
}

export default ChatIdPage;
