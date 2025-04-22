"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addVideoProgress = async (videoId: string) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User is not authenticated or user ID is missing");
  }

  await db.video.update({
    where: {
      id: videoId,
    },
    data: {
      progress: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  revalidatePath("/");
};
