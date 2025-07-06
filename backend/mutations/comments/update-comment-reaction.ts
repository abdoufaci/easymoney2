"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateCommentReaction = async ({
  commentId,
  reactionType,
}: {
  commentId: string;
  reactionType: "like" | "dislike";
}) => {
  const user = await currentUser();

  await db.comment.update({
    where: { id: commentId },
    data: {
      reactors: {
        connect: reactionType === "like" ? { id: user?.id } : undefined,
        disconnect: reactionType === "dislike" ? { id: user?.id } : undefined,
      },
    },
  });

  revalidatePath("/");
};
