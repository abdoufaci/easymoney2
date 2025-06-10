"use server";

import { ChatInputFormSchema } from "@/app/[lang]/admin/followup/_components/chat-input";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addMessage = async ({
  data,
  groupId,
  isChat = false,
}: {
  data: z.infer<typeof ChatInputFormSchema>;
  groupId: string;
  isChat?: boolean;
}) => {
  const user = await currentUser();

  if (isChat) {
    await db.supportGroup.update({
      where: { id: groupId },
      data: {
        messages: {
          create: {
            message: data.message,
            userId: user?.id || "",
          },
        },
        id: groupId,
      },
    });
  } else {
    await db.group.update({
      where: { id: groupId },
      data: {
        messages: {
          create: {
            message: data.message,
            userId: user?.id || "",
          },
        },
      },
    });
  }

  revalidatePath("/");
};
