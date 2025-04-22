import { LoginForm } from "@/components/auth/login-form";
import React from "react";
import { getDictionary } from "../../dictionaries";

async function LoginPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LoginForm dict={dict} />;
}

export default LoginPage;
