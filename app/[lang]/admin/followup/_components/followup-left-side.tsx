import { getGroups } from "@/backend/queries/chat/get-groups";
import FollowupLeftSideFeed from "./followup-left-side-feed";

async function FollowupLeftSide() {
  const groups = await getGroups();

  return <FollowupLeftSideFeed groups={groups} />;
}

export default FollowupLeftSide;
