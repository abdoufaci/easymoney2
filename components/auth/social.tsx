"use client";

import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export function Social() {
  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean);
  const local = pathParts?.[0];
  const searchParams = useSearchParams();

  const redirectUrl = searchParams?.get("redirectUrl");

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: redirectUrl
        ? `/${local}${redirectUrl}`
        : DEFAULT_LOGIN_REDIRECT,
    }).catch((err) =>
      console.error({
        err,
      })
    );
  };

  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-12 h-12 rounded-full flex items-center p-0"
        variant={"whiteOutline"}
        onClick={() => onClick("google")}>
        <FaGoogle className="h-8 w-8" />
      </Button>
    </div>
  );
}
