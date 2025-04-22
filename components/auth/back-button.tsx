"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  linkLabel: string;
}

export function BackButton({ href, label, linkLabel }: BackButtonProps) {
  return (
    <h1 className="font-normal w-full text-center text-xs text-white">
      {label}{" "}
      <Link href={href} className="text-brand underline">
        {linkLabel}
      </Link>
    </h1>
  );
}
