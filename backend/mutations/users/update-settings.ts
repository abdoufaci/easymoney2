"use server";

import { currentUser } from "@/lib/auth";
import { StudentSettingsSchema } from "@/schemas";
import { z } from "zod";
import { deleteFiles } from "../delete-file";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { deleteEverythingFile } from "../delete-everthing-file";

export const updateSettings = async (
  data: z.infer<typeof StudentSettingsSchema>,
  imageToDelete: {
    id: string;
    type: string;
  } | null
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (imageToDelete) {
    await deleteEverythingFile(imageToDelete);
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: data.name,
      image: data.image,
    },
  });

  revalidatePath("/");
};
