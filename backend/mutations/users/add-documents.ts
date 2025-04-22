"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { VerificationDocumentsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addDocuments = async (
  data: z.infer<typeof VerificationDocumentsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      documents: data,
      VerificationStatus: "PENDING",
    },
  });

  revalidatePath("/");
};
