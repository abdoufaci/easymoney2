import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
}

function SettingsCard({ children }: Props) {
  return (
    <Card
      className={cn(
        "shadow-none bg-[#FFFFFF21] rounded-[38.87px] border border-[#FFFFFF3B] w-full max-w-[500px] pt-5"
      )}>
      <CardContent>{children}</CardContent>
      {/* <CardFooter className="py-0 flex items-center justify-center">
        <Button variant={"brand_link"} size={"lg"}>
          Change My Password
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default SettingsCard;
