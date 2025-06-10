import React from "react";
import { getDictionary } from "../dictionaries";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main
      style={{
        backgroundImage: "url('/auth-bg.png')",
      }}
      className="flex flex-col items-center gap-10 p-10 min-h-screen bg-cover">
      <Image alt="logo" src={"/logo.svg"} height={120} width={180} />
      <div className="h-full flex items-center justify-center">{children}</div>
    </main>
  );
}

export default AuthLayout;
