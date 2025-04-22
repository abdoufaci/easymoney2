"use server";

import { AddSectionSchema } from "@/components/forms/add-section-form";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addSection = async (data: z.infer<typeof AddSectionSchema>) => {
  const user = await currentUser();

  if (!user || user?.role === "USER") {
    throw new Error("Unauthorized");
  }

  await db.section.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/");
};
