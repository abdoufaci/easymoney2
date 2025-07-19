import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface FormSuccessProps {
  message?: string;
  verification?: boolean;
}

export const FormSuccess = ({
  message,
  verification = false,
}: FormSuccessProps) => {
  if (!message) return null;

  if (verification) {
    return (
      <div className="space-y-5 w-full flex flex-col items-center">
        <Image
          alt="verification"
          src="/verification.svg"
          height={200}
          width={200}
          className="object-cover"
        />
        <Button
          asChild
          variant={"white"}
          size={"xl"}
          className="w-full rounded-full">
          <Link href={"/auth/login"}>Continue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
