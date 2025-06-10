import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const getGroups = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await db.group.findMany({
    include: {
      members: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
