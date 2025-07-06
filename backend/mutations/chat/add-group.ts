"use server";

import { AddGroupSchema } from "@/components/forms/add-group-form";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addGroup = async (data: z.infer<typeof AddGroupSchema>) => {
  const waitList = await db.waitList.findFirst({
    include: {
      users: true,
    },
  });

  await db.$transaction([
    db.group.create({
      data: {
        name: data.title,
        members: {
          connect: waitList?.users.map((user) => ({ id: user.id })),
        },
      },
    }),
    db.waitList.deleteMany(),
  ]);

  revalidatePath("/");
};
