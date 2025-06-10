import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { QClientProvider } from "@/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <QClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange>
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
