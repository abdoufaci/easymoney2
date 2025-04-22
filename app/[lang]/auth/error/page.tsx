import ErrorCard from "@/components/auth/error-card";
import { getDictionary } from "../../dictionaries";

async function AuthErrorPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ErrorCard dict={dict} />;
}

export default AuthErrorPage;
