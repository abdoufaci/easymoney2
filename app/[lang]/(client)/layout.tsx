import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

interface Props {
  children: React.ReactNode;
}

function ClientLayout({ children }: Props) {
  return <div className="min-h-screen">{children}</div>;
}

export default ClientLayout;
