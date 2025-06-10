"use server";

import { AddMessageFileSchema } from "@/components/forms/add-message-file-form";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { MessageType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addFileMessage = async ({
  data,
  groupId,
  isChat,
}: {
  data: z.infer<typeof AddMessageFileSchema>;
  groupId: string;
  isChat: boolean;
}) => {
  const user = await currentUser();
  const convertedData = data.files.map((file) => ({
    file: {
      url: file.url,
      key: file.key,
      size: file.size,
      name: file.name,
    },
    type: file.type.includes("image")
      ? MessageType.IMAGE
      : file.type.includes("video")
      ? MessageType.VIDEO
      : MessageType.FILE,
    userId: user?.id || "",
  }));

  if (isChat) {
    await db.supportGroup.update({
      where: { id: groupId },
      data: {
        messages: {
          createMany: {
            data: convertedData,
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
          createMany: {
            data: convertedData,
          },
        },
      },
    });
  }

  revalidatePath("/");
};
