"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteStudent = async (studentId?: string) => {
  if (!studentId) {
    throw new Error("Student not found");
  }

  await db.user.delete({
    where: { id: studentId },
  });

  revalidatePath("/");
};
