"use server";

import db from "@/lib/db";

export const updateSession = async (userId: string) => {
  await db.user.update({
    where: { id: userId },
    data: {
      sessions: 0,
    },
  });
};
