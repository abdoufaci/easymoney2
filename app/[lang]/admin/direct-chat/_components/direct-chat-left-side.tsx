import { getSupportGroups } from "@/backend/queries/chat/get-support-groups";
import DirectChatLeftSideFeed from "./direct-chat-left-side-feed";
import { getDirectGroups } from "@/backend/queries/chat/get-direct-groups";

async function DirectChatLeftSide() {
  const groups = await getDirectGroups();

  return <DirectChatLeftSideFeed groups={groups} />;
}

export default DirectChatLeftSide;
