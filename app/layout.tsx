import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { QClientProvider } from "@/providers/query-provider";
import NextTopLoader from "nextjs-toploader";
import { poppins } from "./fonts";

export const metadata: Metadata = {
  title: "EasyMoney University",
  description: "EasyMoney University",
  icons: {
    icon: "/icon.png",
    href: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={poppins.className}>
          <QClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              disableTransitionOnChange>
              <NextTopLoader
                color="#1FB4AB"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #1FB4AB,0 0 5px #1FB4AB"
              />
              {children}
              <ModalProvider />
              <Toaster richColors />
            </ThemeProvider>
          </QClientProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
