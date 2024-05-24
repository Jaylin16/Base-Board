"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import "@/styles/globals.css";
import baseTheme from "@/styles/theme";
import Header from "@/component/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baseTheme}>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
