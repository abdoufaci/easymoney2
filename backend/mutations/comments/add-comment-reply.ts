"use server";

import { AddCommentformSchema } from "@/app/[lang]/(client)/course/[courseId]/[videoId]/_components/comments/comment-header";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addCommentReply = async ({
  data: { comment },
  commentId,
  videoId,
}: {
  data: z.infer<typeof AddCommentformSchema>;
  commentId: string;
  videoId: string;
}) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!comment || comment.trim() === "") {
    throw new Error("Comment cannot be empty");
  }

  await db.comment.update({
    where: { id: commentId },
    data: {
      replies: {
        create: {
          userId: user.id || "",
          comment: comment,
          videoId,
        },
      },
    },
  });

  revalidatePath("/");
};
