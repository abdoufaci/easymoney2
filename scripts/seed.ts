import db from "@/lib/db";

const main = async () => {
  try {
    console.log("Adding direct group");
    const users = await db.user.findMany({
      where: {
        role: "USER",
      },
    });

    const ids = users.map((user) => ({ userId: user.id }));

    await db.supportGroup.createMany({
      data: ids,
    });

    console.log("adding finished");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed the database");
  }
};

main();
