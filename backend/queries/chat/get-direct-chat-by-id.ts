import db from "@/lib/db";

export const getDirectChatById = async (groupId: string) => {
  return await db.directGroup.findUnique({
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
