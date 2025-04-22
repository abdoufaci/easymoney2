import { ResetForm } from "@/components/auth/reset-form";
import { getDictionary } from "../../dictionaries";

async function RestPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ResetForm dict={dict} />;
}

export default RestPage;
