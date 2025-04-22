import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPage() {
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  if (!user?.isActive) {
    redirect("/auth/activate");
  }

  if (user.role === "USER") {
    redirect("/");
  }

  return <div>AdminPage</div>;
}

export default AdminPage;
