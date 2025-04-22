import { NewPasswordForm } from "@/components/auth/new-password-form";
import { getDictionary } from "../../dictionaries";

async function NewPasswordage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <NewPasswordForm dict={dict} />;
}

export default NewPasswordage;
