"use server";

import { AddTestimonySchema } from "@/components/forms/add-testimony-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addTestimony = async ({
  data,
  groupId,
}: {
  data: z.infer<typeof AddTestimonySchema>;
  groupId?: string;
}) => {
  if (!groupId) {
    throw new Error("Group not found");
  }

  await db.testimony.create({
    data: {
      video: data.video,
      testimonyGroupId: groupId,
    },
  });

  revalidatePath("/");
};
