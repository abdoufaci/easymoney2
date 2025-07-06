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
  isDirectChat,
}: {
  data: z.infer<typeof AddMessageFileSchema>;
  groupId: string;
  isChat: boolean;
  isDirectChat: boolean;
}) => {
  const user = await currentUser();
  const convertedData = data.files.map((file) => ({
    file: {
      id: file.id,
    },
    type: file.type.includes("image")
      ? MessageType.IMAGE
      : file.type.includes("video")
      ? MessageType.VIDEO
      : MessageType.FILE,
    userId: user?.id || "",
  }));

  if (isDirectChat) {
    await db.directGroup.update({
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
  }

  revalidatePath("/");
};
