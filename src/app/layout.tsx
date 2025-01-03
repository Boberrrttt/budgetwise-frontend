
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";


const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BudgetWise",
  description: "A collaborative budget tracking website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-neutral-50 dark:bg-neutral-900`}>
        <Providers>
          <NextTopLoader
            height={5}
            showSpinner={false}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
