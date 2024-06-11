"use client";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import "@/styles/globals.css";
import baseTheme from "@/styles/theme";
import Header from "@/component/Header";
import Write from "./write/page";
import DetailPage from "./detail/page";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={baseTheme}>
            <Header />
            {searchParams.get("page") === "write" ? (
              <Write type={searchParams.get("main") as string} />
            ) : searchParams.get("page") === "detail" ? (
              <DetailPage id={searchParams.get("item_id") as string} />
            ) : (
              children
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
