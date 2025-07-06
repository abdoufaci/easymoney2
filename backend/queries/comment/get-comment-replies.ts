"use server";

import db from "@/lib/db";

export const getCommentReplies = async (commentId: string) => {
  return await db.comment.findMany({
    where: {
      commentId,
    },
    include: {
      reactors: true,
      user: true,
      _count: {
        select: { replies: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
