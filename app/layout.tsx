import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import GlobalSnackbar from "@/components/GlobalSnackbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Simple Movie",
  description: "Simple Movie Project By Nott Nott",
};

const mulish = Mulish({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mulish.className}>
      <body>
        <Providers>
          {children}
          <GlobalSnackbar />
        </Providers>
      </body>
    </html>
  );
}
