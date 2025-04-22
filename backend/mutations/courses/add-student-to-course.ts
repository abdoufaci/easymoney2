"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addStudentToCourse = async (
  courseId: string,
  studentId: string
) => {
  const user = await currentUser();

  if (!user || user.role === "USER") {
    throw new Error("Unauthorized");
  }

  await db.course.update({
    where: {
      id: courseId,
    },
    data: {
      students: {
        connect: {
          id: studentId,
        },
      },
    },
  });

  revalidatePath("/");
};
