"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { User, VerificationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const decideDocument = async (
  VerificationStatus: VerificationStatus,
  student?: User
) => {
  const user = await currentUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: {
      id: student?.id,
    },
    data: {
      VerificationStatus,
    },
  });

  revalidatePath("/");
};
