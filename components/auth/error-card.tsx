import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";

interface Props {
  dict: any;
}

function ErrorCard({ dict }: Props) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="" mainHeaderLabel={dict.auth.oops} />
      </CardHeader>
      <CardFooter>
        <BackButton
          href="/auth/login"
          label=""
          linkLabel={dict.auth.backToLogin}
        />
      </CardFooter>
    </Card>
  );
}

export default ErrorCard;
