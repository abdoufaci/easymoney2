import { RegisterForm } from "@/components/auth/register-form";
import React from "react";
import { getDictionary } from "../../dictionaries";

async function RegisterPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <RegisterForm dict={dict} />;
}

export default RegisterPage;
