import db from "@/lib/db";

export const getSupportChatById = async (groupId: string) => {
  return await db.supportGroup.findUnique({
    where: {
      id: groupId,
    },
    include: {
      user: true,
      messages: {
        include: {
          user: true,
        },
      },
    },
  });
};
