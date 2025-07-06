"use server";

import { AddCommentformSchema } from "@/app/[lang]/(client)/course/[courseId]/[videoId]/_components/comments/comment-header";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addComment = async ({
  data: { comment },
  videoId,
}: {
  data: z.infer<typeof AddCommentformSchema>;
  videoId: string;
}) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!comment || comment.trim() === "") {
    throw new Error("Comment cannot be empty");
  }

  if (!videoId) {
    throw new Error("Video ID is required");
  }

  await db.comment.create({
    data: {
      videoId,
      userId: user.id || "",
      comment: comment,
    },
  });

  revalidatePath("/");
};
