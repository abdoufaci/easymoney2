import db from "@/lib/db";

export const getGroupChatById = async (groupId: string) => {
  return await db.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
      messages: {
        include: {
          user: true,
        },
      },
    },
  });
};
