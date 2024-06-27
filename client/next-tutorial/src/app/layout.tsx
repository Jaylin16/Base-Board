"use client";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import "@/styles/globals.css";
import baseTheme from "@/styles/theme";
import Header from "@/component/Header";
import DetailPage from "@/component/pages/board/DetailPage";
import WritePage from "@/component/pages/board/WritePage";

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
              <WritePage searchParams={searchParams} />
            ) : searchParams.get("page") === "detail" &&
              searchParams.get("item_id") ? (
              <DetailPage searchParams={searchParams} />
            ) : (
              children
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
