import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const students = await db.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      students,
    });
  } catch (error) {
    console.log("[STUDENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
