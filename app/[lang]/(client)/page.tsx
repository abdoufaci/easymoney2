import { currentUser } from "@/lib/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";

export default async function Home({ params }: any) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <main>{dict.home.title}</main>;
}
