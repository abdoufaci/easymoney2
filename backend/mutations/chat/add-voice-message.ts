"use server";

import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ClientUploadedFileData } from "uploadthing/types";

export const addVoiceMessage = async ({
  groupId,
  file,
  isChat = false,
  isDirectChat = false,
}: {
  groupId: string;
  file: {
    id: string;
    type: string;
  };
  isChat?: boolean;
  isDirectChat?: boolean;
}) => {
  const user = await currentUser();

  console.log("Adding voice message [server]");

  if (isDirectChat) {
    await db.directGroup.update({
      where: { id: groupId },
      data: {
        messages: {
          create: {
            userId: user?.id || "",
            type: "AUDIO",
            file,
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
            create: {
              userId: user?.id || "",
              type: "AUDIO",
              file,
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
              userId: user?.id || "",
              type: "AUDIO",
              file,
            },
          },
        },
      });
    }
  }

  revalidatePath("/");
};
