"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteComment = async (commentId: string) => {
  await db.comment.delete({
    where: { id: commentId },
  });

  revalidatePath("/");
};
