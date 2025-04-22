import NewVerificationForm from "@/components/auth/new-verification-form";
import React from "react";
import { getDictionary } from "../../dictionaries";

async function NewVerificationPage({ params }: { params: any }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <NewVerificationForm dict={dict} />;
}

export default NewVerificationPage;
