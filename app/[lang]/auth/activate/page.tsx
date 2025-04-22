import { getDictionary } from "../../dictionaries";
import { ActivateForm } from "@/components/auth/activate-form";

async function ActivatePage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ActivateForm dict={dict} />;
}

export default ActivatePage;
