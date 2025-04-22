"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonLinkLabel?: string;
  backButtonHref?: string;
  mainHeaderLabel: string;
  showSocial?: boolean;
  isActivate?: boolean;
}

export function CardWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  showSocial,
  backButtonLinkLabel,
  mainHeaderLabel,
  isActivate = false,
}: CardWrapperProps) {
  return (
    <Card
      className={cn(
        "shadow-none bg-[#FFFFFF21] rounded-[38.87px] border border-[#FFFFFF3B]",
        showSocial ? "sm:!w-[500px] pb-10" : "sm:!w-[550px]"
      )}>
      <CardHeader>
        <Header
          label={headerLabel}
          mainHeaderLabel={mainHeaderLabel}
          isActivate={isActivate}
        />
      </CardHeader>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardContent>{children}</CardContent>
      {backButtonLabel && backButtonHref && backButtonLinkLabel && (
        <CardFooter className="py-0">
          <BackButton
            href={backButtonHref}
            label={backButtonLabel}
            linkLabel={backButtonLinkLabel}
          />
        </CardFooter>
      )}
    </Card>
  );
}
