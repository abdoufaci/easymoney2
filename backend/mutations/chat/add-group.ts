"use server";

import { AddGroupSchema } from "@/components/forms/add-group-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addGroup = async (data: z.infer<typeof AddGroupSchema>) => {
  await db.group.create({
    data: {
      name: data.title,
    },
  });

  revalidatePath("/");
};
