import db from "@/lib/db";

export const getStudentChat = async (userId: string) => {
  return await db.directGroup.findFirst({
    where: {
      userId,
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
