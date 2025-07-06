import { currentUser } from "@/lib/auth";
import { getDictionary } from "../../dictionaries";
import { ActivateForm } from "@/components/auth/activate-form";
import { logout } from "@/backend/auth-actions/logout";
import { redirect } from "next/navigation";

async function ActivatePage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const user = await currentUser();

  if (!user) {
    logout().then(() => redirect("/"));
  }

  return <ActivateForm dict={dict} user={user} />;
}

export default ActivatePage;
