import { currentUser } from "@/lib/auth";
import { getDictionary } from "../dictionaries";
import { redirect } from "next/navigation";
import { sendVerificationEmail } from "@/lib/mail";

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

  // await sendVerificationEmail("abdoufaci982@gmail.com", "abd", "Abdou Faci");

  return <main>{dict.home.title}</main>;
}
