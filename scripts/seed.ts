import db from "@/lib/db";
import { v4 } from "uuid";

const main = async () => {
  try {
    console.log("Adding direct group");

    // const users = await db.user.findMany();

    // users.map(async (user) => {
    //   await db.user.update({
    //     where: { id: user.id },
    //     data: {
    //       directGroups: {
    //         create: {
    //           id: v4(),
    //         },
    //       },
    //     },
    //   });
    // });

    console.log("adding finished");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed the database");
  }
};

main();
