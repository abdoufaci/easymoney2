"use server";

import { ProfileformSchema } from "@/app/[lang]/settings/_components/profile-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateUser({
  data,
  userId,
}: {
  data: z.infer<typeof ProfileformSchema>;
  userId?: string;
}) {
  if (!userId) {
    return null;
  }

  // Update user in database
  const user = await db.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
    },
  });

  revalidatePath("/");
  return user;
}
