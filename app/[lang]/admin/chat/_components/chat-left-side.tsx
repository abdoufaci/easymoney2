import { getGroups } from "@/backend/queries/chat/get-groups";
import ChatLeftSideFeed from "./chat-left-side-feed";
import { getSupportGroups } from "@/backend/queries/chat/get-support-groups";

async function ChatLeftSide() {
  const groups = await getSupportGroups();

  return <ChatLeftSideFeed groups={groups} />;
}

export default ChatLeftSide;
