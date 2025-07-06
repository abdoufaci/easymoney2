"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteTestimony = async (id: string) => {
  const user = await currentUser();

  if (!user || user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await db.testimony.delete({
    where: { id },
  });

  revalidatePath("/");
};
