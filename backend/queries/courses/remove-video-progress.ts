"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const removeVideoProgress = async (progressId: string) => {
  await db.videoProgress.delete({
    where: {
      id: progressId,
    },
  });

  revalidatePath("/");
};
