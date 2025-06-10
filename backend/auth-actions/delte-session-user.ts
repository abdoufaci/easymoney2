import db from "@/lib/db";

export async function deleteSessionData(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      sessions: 0,
    },
  });
}
