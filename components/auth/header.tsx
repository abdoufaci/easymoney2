import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  mainHeaderLabel: string;
  isActivate?: boolean;
}

export const Header = ({
  label,
  mainHeaderLabel,
  isActivate = false,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center text-white">
      <h1
        className={cn(
          "text-3xl font-semibold whitespace-break-spaces text-center",
          font.className,
          isActivate && "text-xl"
        )}>
        {mainHeaderLabel}
      </h1>
      <p className="text-muted-foreground text-sm text-white text-center whitespace-break-spaces">
        {label}
      </p>
    </div>
  );
};
