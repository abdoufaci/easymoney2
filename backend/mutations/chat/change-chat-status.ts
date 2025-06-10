"use server";

import db from "@/lib/db";
import { GroupStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeChatStatus = async (
  groupId: string,
  status: GroupStatus
) => {
  await db.group.update({
    where: {
      id: groupId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/");
};
