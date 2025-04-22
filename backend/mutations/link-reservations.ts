import db from "@/lib/db";

export const linkReservations = async ({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}) => {
  // await db.reservation.updateMany({
  //   where: {
  //     bookerEmail: userEmail,
  //   },
  //   data: {
  //     bookerId: userId,
  //   },
  // });
};
