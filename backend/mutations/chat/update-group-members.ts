"use server";

import db from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateGroupMembers = async ({
  groupId,
  studentsToAdd,
  studentsToRemove,
}: {
  studentsToAdd: User[];
  studentsToRemove: User[];
  groupId: string;
}) => {
  await db.group.update({
    where: {
      id: groupId,
    },
    data: {
      members: {
        connect: studentsToAdd.map((student) => ({ id: student.id })),
        disconnect: studentsToRemove.map((student) => ({ id: student.id })),
      },
    },
  });

  revalidatePath("/");
};
