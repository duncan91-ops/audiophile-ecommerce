import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audiophile",
  description: "Audiophile Ecommerce Application",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Header />
        {modal}
        {children}
      </body>
    </html>
  );
}
